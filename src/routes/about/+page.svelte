<script lang="ts">
    import SEO from "$lib/components/SEO.svelte";
    import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
    import DotMatrix from "$lib/components/DotMatrix.svelte";

    const contributions = [
        {
            project: "go-ini/ini",
            href: "https://github.com/go-ini/ini",
            lang: "Go",
            status: "Merged — v1.67.3",
            note: "Rewrote config loading to decode lazily, taking most of the allocations out of the path."
        },
        {
            project: "Microsoft Playwright",
            href: "https://github.com/microsoft/playwright",
            lang: "Docs",
            status: "Merged upstream",
            note: "Documented a browser cache behaviour that silently desynchronizes page state after a back navigation."
        },
        {
            project: "Forgejo",
            href: "https://codeberg.org/forgejo/forgejo",
            lang: "JavaScript",
            status: "Merged — backported v15, v16",
            note: "Fixed a Firefox back-navigation bug that left forms stuck mid-submit. The hard part was why the test suite could never have caught it."
        }
    ];

    const principles = [
        "Read before writing. The explanation is usually already in the codebase.",
        "Prefer subtraction. My better changes removed something.",
        "Measure, then argue. A profiler settles in a minute what two people debate for a week.",
        "Boring technology, chosen slowly, outlives clever technology chosen quickly.",
        "If it cannot be rolled back, it is not finished.",
        "Write it down. Documentation outlasts your memory of the work."
    ];

    const elsewhere = [
        { label: "Résumé", value: "kashish-sahu-resume.pdf", href: "/kashish-sahu-resume.pdf" },
        { label: "Email", value: "kashish@plutolab.org", href: "mailto:kashish@plutolab.org" },
        { label: "Code", value: "github.com/gitKashish", href: "https://github.com/gitKashish" },
        { label: "Forge", value: "git.plutolab.org", href: "https://git.plutolab.org" },
        { label: "LinkedIn", value: "linkedin.com/in/kashish-sahu", href: "https://linkedin.com/in/kashish-sahu" }
    ];

    // The masthead portrait gets a tighter crop in the narrow column, where the
    // full bust would be too small to read as a face.
    let viewport = $state(0);
    const narrow = $derived(viewport > 0 && viewport < 640);

    // schema.org Person — sameAs comes off the same list rendered below, so the
    // profiles a search engine ties to the name cannot drift from the page.
    const person = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Kashish Sahu",
        url: "https://plutolab.org/about",
        image: "https://plutolab.org/assets/images/about/og.png",
        jobTitle: "Backend Engineer",
        email: "kashish@plutolab.org",
        knowsAbout: ["Go", "Node.js", "MySQL", "Redis", "Self-hosting", "Open source"],
        sameAs: elsewhere.filter((l) => l.href.startsWith("http")).map((l) => l.href)
    };
</script>

<SEO
    title="Kashish Sahu — Backend Engineer | PlutoLab"
    description="Kashish Sahu — backend engineer working in Node and Go against MySQL and Redis. Upstream patches to go-ini, Playwright and Forgejo; self-hosts PlutoLab."
    image="https://plutolab.org/assets/images/about/og.png"
/>

<!-- Structured data, so a search for the name has something to attach to -->
<svelte:head>
    {@html `<script type="application/ld+json">${JSON.stringify(person)}</script>`}
</svelte:head>

<svelte:window bind:innerWidth={viewport} />

<div class="max-w-2xl mx-auto px-4 sm:px-0 py-6">

    <!-- ── Masthead ─────────────────────────────────────────── -->
    <header class="mb-12 sm:mb-16">
        <!-- Standing head: the page's own label, since the site mark is already in the nav -->
        <div class="flex items-end justify-between gap-6 border-b border-border-main pb-4 sm:pb-5">
            <p class="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-text-muted">
                About &mdash; Kashish Sahu
            </p>

            <div class="dot-field hidden h-9 w-24 sm:block"></div>
        </div>

        <!-- Two columns at every width — stacking left the portrait marooned. Below
             `sm` the headline drops its hard line breaks and wraps to the narrower
             measure instead (see the media query at the foot of this file). -->
        <div class="grid grid-cols-[1fr_128px] items-center gap-4 pt-8
                    sm:grid-cols-[1.2fr_0.8fr] sm:gap-6 sm:pt-12">
            <h1 class="headline text-2xl sm:text-4xl font-serif font-medium leading-[1.25] sm:leading-[1.15] tracking-tight text-text-main">
                I build backends,<br />
                read a great deal of<br />
                other people's code,<br />
                <span class="italic text-primary">and keep a small server running.</span>
            </h1>

            <!-- Dissolves on the inner edge, towards the text, and along the bottom;
                 the right edge keeps its hard crop so the face runs out of frame. -->
            <DotMatrix
                src="/assets/images/about/portrait.png"
                alt="Halftone portrait of Kashish Sahu"
                fade={0}
                dissolve={narrow ? { left: 0.18, bottom: 0.18 } : { left: 0.2, bottom: 0.1 }}
                zoom={narrow ? 1.15 : 1}
                focusY={narrow ? 0.58 : 0.5}
                class="text-primary w-full -mr-4 sm:-mr-6"
            />
        </div>

        <div class="mt-7 font-mono text-xs leading-relaxed sm:mt-9">
            <p class="text-primary">$ whoami</p>
            <p class="text-text-muted">
                <span class="text-primary">&gt;</span> backend engineer, builder, self-hoster
            </p>
        </div>

        <!-- Contact sits in the masthead: nobody should have to scroll for a résumé. -->
        <nav
            aria-label="Elsewhere"
            class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border-main py-4
                   font-mono text-[0.7rem] sm:mt-10 sm:gap-x-6"
        >
            <span class="text-primary">$ ls elsewhere/</span>
            {#each elsewhere as link}
                <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    title={link.value}
                    class="group inline-flex items-center gap-1.5 uppercase tracking-[0.18em] text-text-muted
                           hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    {link.label}
                    <ArrowUpRight
                        class="size-3 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                </a>
            {/each}
        </nav>
    </header>

    <!-- ── § 01 ─────────────────────────────────────────────── -->
    <section class="relative mb-14">
        <span class="section-mark">01</span>
        <h2 class="mark-inline"><span class="text-primary mr-1">&gt;</span> Who</h2>

        <p class="drop-cap font-serif text-lg leading-[1.75] text-text-main mb-5">
            Kashish Sahu &mdash; backend engineer, working in Node and Go against
            MySQL and Redis. Most of the work is schema and query performance,
            caching, and the failure modes that only turn up under load.
        </p>

        <p class="font-serif text-lg leading-[1.75] text-text-muted">
            Much of the week goes to reading code rather than writing it. The rest
            goes to PlutoLab &mdash; an old laptop under a desk running this site, a
            Git forge, and whatever I am currently taking apart. Renting
            infrastructure teaches you to fill in a form; running it teaches you what
            happens at three in the morning.
        </p>
    </section>

    <!-- ── § 02 ─────────────────────────────────────────────── -->
    <section class="relative mb-14">
        <span class="section-mark">02</span>
        <h2 class="mark-inline"><span class="text-primary mr-1">&gt;</span> Open Source</h2>

        <p class="font-serif text-lg leading-[1.75] text-text-muted mb-7">
            Patches to projects far larger than anything I maintain. Each started as
            a problem I hit while using the thing.
        </p>

        <div class="space-y-3">
            {#each contributions as item}
                <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group block border-l-2 border-primary/40 bg-primary/[0.04] py-4 pl-5 pr-4
                           hover:border-primary hover:bg-primary/[0.08] transition-colors
                           outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <div class="flex items-baseline justify-between gap-3">
                        <span class="font-serif text-xl text-text-main group-hover:text-primary transition-colors">
                            {item.project}
                        </span>
                        <ArrowUpRight
                            class="size-4 shrink-0 self-center text-text-muted group-hover:text-primary transition-colors"
                        />
                    </div>

                    <div class="mt-2 mb-3 flex flex-wrap items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em]">
                        <span class="border border-border-main px-2 py-0.5 text-text-muted">
                            {item.lang}
                        </span>
                        <span class="border border-primary/50 px-2 py-0.5 text-primary">
                            {item.status}
                        </span>
                    </div>

                    <p class="font-serif text-base leading-[1.7] text-text-muted">
                        {item.note}
                    </p>
                </a>
            {/each}
        </div>
    </section>

    <!-- ── § 03 ─────────────────────────────────────────────── -->
    <section class="relative mb-14">
        <span class="section-mark">03</span>
        <h2 class="mark-inline"><span class="text-primary mr-1">&gt;</span> How I Work</h2>

        <ol class="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {#each principles as principle, i}
                <li class="flex gap-4">
                    <span class="font-mono text-xs text-primary shrink-0 pt-[0.3rem] tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <p class="font-serif text-base leading-[1.7] text-text-main">
                        {principle}
                    </p>
                </li>
            {/each}
        </ol>

        <p class="font-serif italic text-base text-text-muted mt-7">
            I do not always manage it; that is rather the point of writing them down.
        </p>
    </section>

    <!-- ── Signature ────────────────────────────────────────── -->
    <p class="font-serif italic text-lg text-text-main text-right mb-12">
        &mdash; Kashish
    </p>

    <!-- ── Colophon ─────────────────────────────────────────── -->
    <footer class="border-t-2 border-text-main pt-5">
        <p class="font-mono text-xs text-primary mb-3">$ colophon</p>
        <div class="font-mono text-xs leading-relaxed text-text-muted space-y-1">
            <p><span class="text-primary">&gt;</span> set in Source Serif 4 and Inter</p>
            <p><span class="text-primary">&gt;</span> built with Svelte and Tailwind</p>
            <p>
                <span class="text-primary">&gt;</span> served from a repurposed laptop behind an
                mTLS tunnel
            </p>
            <p><span class="text-primary">&gt;</span> deployed by a symlink</p>
        </div>
    </footer>
</div>

<style>
    /* Hanging section marks — they sit in the margin when there is one,
       and fold back above the heading when there isn't. */
    .section-mark {
        display: block;
        margin-bottom: 0.3rem;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 0.8rem;
        letter-spacing: 0.2em;
        color: var(--primary);
    }

    @media (min-width: 1280px) {
        .section-mark {
            position: absolute;
            top: 0.15rem;
            left: -5.5rem;
            margin-bottom: 0;
            text-align: right;
            width: 4rem;
        }
    }

    /* Ruled heading above each section body */
    .mark-inline {
        margin-bottom: 1.5rem;
        padding-bottom: 0.7rem;
        border-bottom: 1px solid var(--border-main);
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-main);
    }

    /* Background texture for the frontispiece corners */
    .dot-field {
        background-image: radial-gradient(var(--text-muted) 1px, transparent 1px);
        background-size: 12px 12px;
        opacity: 0.35;
        pointer-events: none;
    }

    /* The headline's breaks are set for the wide measure; in the narrow column
       beside the portrait it has to wrap on its own. */
    @media (max-width: 639px) {
        .headline br {
            display: none;
        }
    }

    .drop-cap::first-letter {
        float: left;
        margin: 0.32rem 0.7rem 0 0;
        font-family: var(--font-serif);
        font-size: 4.1rem;
        font-weight: 500;
        line-height: 0.78;
        color: var(--primary);
    }
</style>
