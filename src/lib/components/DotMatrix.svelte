<script lang="ts">
    import { onMount } from "svelte";
    import { useTheme } from "$lib/theme.svelte";

    let {
        src,
        alt = "",
        cell = 2.6,
        maxDot = 0.95,
        floor = 0.07,
        gamma = 1.2,
        polarity = "auto",
        silhouette = 0.24,
        fade = 0.35,
        dissolve = 0.25,
        zoom = 1,
        focusX = 0.5,
        focusY = 0.5,
        aspect = 0,
        class: className = ""
    }: {
        /** Same-origin image — the canvas reads its pixels back. */
        src: string;
        alt?: string;
        /** Distance between dot centres, in CSS pixels. */
        cell?: number;
        /** Largest dot diameter, as a fraction of `cell`. */
        maxDot?: number;
        /** Ink below this is not drawn — this is what keeps the background empty. */
        floor?: number;
        /** >1 pushes the mid-tones down, which thins out the flat areas. */
        gamma?: number;
        /** Which end of the range becomes a dot. `auto` follows the theme: the dots
            are the highlights in dark mode and the shadows in light mode, so primary
            always reads as ink against the page rather than as a negative. */
        polarity?: "auto" | "darks" | "lights";
        /** 0–1. Minimum ink over the whole subject when the dots are shadows, so a
            pale shirt on a pale page still has a body instead of a floating head.
            Not applied when the dots are highlights — there, empty *is* the shadow. */
        silhouette?: number;
        /** 0–1. Thins the dots towards the edges, so a busy background dissolves
            and the subject keeps the weight. 0 disables it. */
        fade?: number;
        /** How far in from an edge the dots dissolve into scatter, as a fraction of
            that axis. A bare number means the bottom edge; pass an object to pick
            sides — an edge left at 0 keeps its hard crop, which is what you want on
            a side that bleeds out of the frame. */
        dissolve?: number | { top?: number; right?: number; bottom?: number; left?: number };
        /** Crop factor. 1 fits the whole image; 2 shows half of it, twice the size. */
        zoom?: number;
        /** Where the crop is centred, 0–1 across the source image. */
        focusX?: number;
        focusY?: number;
        /** Output frame ratio as width ÷ height (0.75 is a tall portrait). Defaults
            to the source image's own ratio. */
        aspect?: number;
        class?: string;
    } = $props();

    const theme = useTheme();

    let host = $state<HTMLDivElement | null>(null);
    let canvas = $state<HTMLCanvasElement | null>(null);
    let failed = $state(false);
    let source: HTMLImageElement | null = null;

    // Stable per-cell jitter — deterministic, so a repaint does not reshuffle dots.
    function noise(n: number) {
        const s = Math.sin(n * 127.1) * 43758.5453;
        return s - Math.floor(s);
    }

    /** 1 well inside the frame, easing to 0 at the edge. `p` is the distance from
        that edge, `amount` the width of the band it dissolves over. */
    function edgeKeep(p: number, amount = 0) {
        if (amount <= 0) return 1;
        const t = Math.min(1, Math.max(0, p / amount));
        return t * t * (3 - 2 * t);
    }

    const edges: { top?: number; right?: number; bottom?: number; left?: number } = $derived(
        typeof dissolve === "number" ? { bottom: dissolve } : dissolve
    );

    function draw() {
        if (!host || !canvas || !source) return;

        const width = host.clientWidth;
        if (!width) return;

        const sourceW = source.naturalWidth;
        const sourceH = source.naturalHeight;

        // Frame ratio, expressed the way the rest of this function wants it: h ÷ w.
        const ratio = aspect > 0 ? 1 / aspect : sourceH / sourceW;
        const height = Math.round(width * ratio);

        const cols = Math.max(1, Math.floor(width / cell));
        const rows = Math.max(1, Math.round(cols * ratio));

        // Largest region of the frame's ratio that fits the source, shrunk by the
        // zoom and slid to sit under the focus point.
        const fitW = Math.min(sourceW, sourceH / ratio);
        const scale = Math.max(1, zoom);
        const sw = fitW / scale;
        const sh = (fitW * ratio) / scale;
        const sx = Math.min(Math.max(focusX * sourceW - sw / 2, 0), sourceW - sw);
        const sy = Math.min(Math.max(focusY * sourceH - sh / 2, 0), sourceH - sh);

        // Downscale once to the sampling grid and let the browser's own filtering
        // do the averaging, then read the pixels back as one dot per cell.
        const sampler = document.createElement("canvas");
        sampler.width = cols;
        sampler.height = rows;
        const sctx = sampler.getContext("2d", { willReadFrequently: true });
        if (!sctx) return;
        sctx.drawImage(source, sx, sy, sw, sh, 0, 0, cols, rows);
        const { data } = sctx.getImageData(0, 0, cols, rows);

        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        // Inherited from the element's `color`, so `text-primary` on the host wins.
        ctx.fillStyle = getComputedStyle(canvas).color;

        const count = cols * rows;
        const lum = new Float32Array(count);
        const opaque = new Uint8Array(count);
        let opaqueCount = 0;

        for (let n = 0; n < count; n++) {
            const i = n * 4;
            // A cut-out background is absence, not a bright area — it must never
            // become the brightest thing in the frame and ink solid.
            if (data[i + 3] < 90) continue;
            opaque[n] = 1;
            opaqueCount++;
            lum[n] = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
        }

        if (!opaqueCount) return;

        // The dots are always primary, so they have to play the part the page
        // background leaves open: highlights on a dark page, shadows on a light one.
        const inkDarks = polarity === "auto" ? !theme.isDark : polarity === "darks";

        // Stretch the ink range to the 2nd/98th percentiles so a low-contrast
        // photo still resolves, and a stray highlight cannot flatten everything.
        const bins = new Uint32Array(256);
        for (let n = 0; n < count; n++) {
            if (!opaque[n]) continue;
            const ink = inkDarks ? 1 - lum[n] : lum[n];
            bins[Math.min(255, Math.max(0, Math.round(ink * 255)))]++;
        }

        const lowCut = opaqueCount * 0.02;
        const highCut = opaqueCount * 0.98;
        let seen = 0;
        let lo = 0;
        let hi = 255;
        for (let b = 0; b < 256; b++) {
            seen += bins[b];
            if (lo === 0 && seen >= lowCut) lo = b;
            if (seen >= highCut) {
                hi = b;
                break;
            }
        }
        const span = Math.max(1, hi - lo) / 255;

        const cellW = width / cols;
        const cellH = height / rows;
        const rMax = (Math.min(cellW, cellH) * maxDot) / 2;
        const base = inkDarks ? Math.min(1, Math.max(0, silhouette)) : 0;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const n = y * cols + x;
                if (!opaque[n]) continue;

                const ink = inkDarks ? 1 - lum[n] : lum[n];
                let v = Math.pow(
                    Math.min(1, Math.max(0, (ink - lo / 255) / span)),
                    gamma
                );

                // Lift the whole silhouette off the floor so the cut-out keeps its
                // shape; tone still separates, it just starts above zero.
                if (base > 0) v = base + (1 - base) * v;

                if (fade > 0) {
                    const dx = Math.abs((x + 0.5) / cols - 0.5) * 2;
                    const dy = Math.abs((y + 0.5) / rows - 0.5) * 2;
                    const d = Math.max(dx, dy);
                    // smoothstep from the middle of the frame out to the edge
                    const t = Math.min(1, Math.max(0, (d - 0.55) / 0.45));
                    v *= 1 - fade * t * t * (3 - 2 * t);
                }

                const xn = (x + 0.5) / cols;
                const yn = (y + 0.5) / rows;
                const keep =
                    edgeKeep(xn, edges.left) *
                    edgeKeep(1 - xn, edges.right) *
                    edgeKeep(yn, edges.top) *
                    edgeKeep(1 - yn, edges.bottom);

                if (keep < 1) {
                    // Shrink and thin out at once: a uniform ramp would just read as
                    // a grey band with the same hard edge under it.
                    v *= keep;
                    if (noise(n) > Math.pow(keep, 0.55)) continue;
                }

                if (v < floor) continue;

                ctx.globalAlpha = 0.35 + 0.65 * v;
                ctx.beginPath();
                ctx.arc((x + 0.5) * cellW, (y + 0.5) * cellH, v * rMax, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.globalAlpha = 1;
    }

    onMount(() => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
            source = img;
            draw();
        };
        img.onerror = () => {
            failed = true;
        };
        img.src = src;

        const observer = new ResizeObserver(() => draw());
        if (host) observer.observe(host);
        return () => observer.disconnect();
    });

    // The dots are painted, not styled, so anything that changes the raster —
    // the theme, the crop, the tuning — has to ask for a repaint by hand.
    $effect(() => {
        void [
            theme.isDark,
            cell,
            maxDot,
            floor,
            gamma,
            polarity,
            silhouette,
            edges,
            zoom,
            focusX,
            focusY,
            aspect
        ];
        requestAnimationFrame(() => draw());
    });
</script>

{#if failed}
    <!-- No source image: leave an honest patch of texture rather than a hole. -->
    <div class="dot-field {className}" aria-hidden="true"></div>
{:else}
    <div bind:this={host} class={className} role="img" aria-label={alt}>
        <canvas bind:this={canvas} class="block w-full" aria-hidden="true"></canvas>
    </div>
{/if}

<style>
    .dot-field {
        aspect-ratio: 4 / 5;
        background-image: radial-gradient(currentColor 1px, transparent 1px);
        background-size: 5px 5px;
        opacity: 0.18;
    }
</style>
