<script lang="ts">
    import SEO from "$lib/components/SEO.svelte";
    import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";

    const contributions = [
        {
            project: "go-ini/ini",
            href: "https://github.com/go-ini/ini",
            meta: "Go — merged, released in v1.67.3",
            note: "Rewrote the config-loading path to decode lazily, which took most of the allocations out of it. The library is small and old and quietly everywhere, which made it a good place to learn how to touch something carefully."
        },
        {
            project: "Microsoft Playwright",
            href: "https://github.com/microsoft/playwright",
            meta: "Docs — merged upstream",
            note: "Wrote down a browser cache behaviour that silently desynchronizes page state after a back navigation. It had cost me an afternoon; documenting it seemed like the cheapest way to stop it costing anyone else one."
        },
        {
            project: "Forgejo",
            href: "https://codeberg.org/forgejo/forgejo",
            meta: "JavaScript — merged, backported to v15 and v16",
            note: "Fixed a Firefox back-navigation bug that left forms stuck mid-submit. Most of the work was figuring out why the test suite could never have caught it."
        }
    ];

    const principles = [
        "Read before writing. The explanation for most bugs is already somewhere in the codebase, written by someone who has since moved on.",
        "Prefer subtraction. The change I am proudest of usually removed something.",
        "Measure, then argue. A profiler settles in a minute what two engineers can debate for a week.",
        "Boring technology, chosen slowly, tends to outlive clever technology chosen quickly.",
        "If it cannot be rolled back, it is not finished.",
        "Write it down. Documentation is the part of the work that outlasts your memory of it."
    ];

    const elsewhere = [
        { label: "Résumé", value: "kashish-sahu-resume.pdf", href: "/kashish-sahu-resume.pdf" },
        { label: "Email", value: "kashish@plutolab.org", href: "mailto:kashish@plutolab.org" },
        { label: "Code", value: "github.com/gitKashish", href: "https://github.com/gitKashish" },
        { label: "Forge", value: "git.plutolab.org", href: "https://git.plutolab.org" },
        { label: "LinkedIn", value: "linkedin.com/in/kashish-sahu", href: "https://linkedin.com/in/kashish-sahu" }
    ];
</script>

<SEO
    title="About | PlutoLab"
    description="Kashish Sahu — backend engineer in Mohali. Databases, open source, and a small server under a desk."
/>

<div class="max-w-2xl mx-auto px-4 sm:px-0 py-6">

    <!-- ── Frontispiece ─────────────────────────────────────── -->
    <header class="mb-20">
        <p class="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-text-muted mb-8">
            About &mdash; Kashish Sahu
        </p>

        <h1 class="text-4xl sm:text-5xl font-serif font-medium leading-[1.15] tracking-tight text-text-main">
            I build backends,<br />
            read a great deal of<br />
            other people's code,<br />
            <span class="italic text-primary">and keep a small server running.</span>
        </h1>

        <div class="mt-10 h-px w-24 bg-text-main"></div>
    </header>

    <!-- ── § 01 ─────────────────────────────────────────────── -->
    <section class="relative mb-20">
        <span class="section-mark">&sect; 01</span>
        <h2 class="mark-inline">Who</h2>

        <p class="drop-cap font-serif text-lg leading-[1.85] text-text-main mb-6">
            My name is Kashish Sahu. I am a backend-leaning engineer in Mohali,
            Punjab, working mostly in Node and Go against MySQL and Redis. Day to
            day that means the unglamorous middle of a system: the query that got
            slow, the index nobody added, the connection that was never closed.
        </p>

        <p class="font-serif text-lg leading-[1.85] text-text-muted mb-6">
            A fair amount of my week is spent reading code rather than writing it.
            I did not expect review to be the part I enjoyed most, but it is where
            I have learned the fastest &mdash; from people more experienced than me,
            and from the archaeology of decisions made years before I arrived.
        </p>

        <p class="font-serif text-lg leading-[1.85] text-text-muted">
            The rest goes to PlutoLab, which is an old laptop under a desk. It runs
            this site, a Git forge, and whatever I am currently taking apart. Renting
            infrastructure teaches you to fill in a form; running it teaches you what
            happens at three in the morning. I wanted the second lesson.
        </p>
    </section>

    <!-- ── § 02 ─────────────────────────────────────────────── -->
    <section class="relative mb-20">
        <span class="section-mark">&sect; 02</span>
        <h2 class="mark-inline">Open Source</h2>

        <p class="font-serif text-lg leading-[1.85] text-text-muted mb-10">
            Small contributions to projects far larger than anything I maintain.
            Each one started as a problem I hit while using the thing.
        </p>

        <div class="space-y-10">
            {#each contributions as item}
                <article class="border-l-2 border-border-main pl-6 hover:border-primary transition-colors">
                    <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group inline-flex items-baseline gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <span class="font-serif text-xl text-text-main group-hover:text-primary underline decoration-border-main underline-offset-[6px] group-hover:decoration-primary transition-colors">
                            {item.project}
                        </span>
                        <ArrowUpRight
                            class="size-4 shrink-0 self-center text-text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all"
                        />
                    </a>

                    <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-text-muted mt-2 mb-4">
                        {item.meta}
                    </p>

                    <p class="font-serif text-base leading-[1.8] text-text-muted">
                        {item.note}
                    </p>
                </article>
            {/each}
        </div>
    </section>

    <!-- ── § 03 ─────────────────────────────────────────────── -->
    <section class="relative mb-20">
        <span class="section-mark">&sect; 03</span>
        <h2 class="mark-inline">Things I Try To Hold To</h2>

        <ol class="space-y-6">
            {#each principles as principle, i}
                <li class="flex gap-5">
                    <span class="font-mono text-xs text-primary shrink-0 pt-[0.45rem] tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <p class="font-serif text-lg leading-[1.75] text-text-main">
                        {principle}
                    </p>
                </li>
            {/each}
        </ol>

        <p class="font-serif italic text-base text-text-muted mt-8">
            I do not always manage it. That is rather the point of writing them down.
        </p>
    </section>

    <!-- ── § 04 ─────────────────────────────────────────────── -->
    <section class="relative mb-20">
        <span class="section-mark">&sect; 04</span>
        <h2 class="mark-inline">Elsewhere</h2>

        <ul class="border-t border-border-main">
            {#each elsewhere as link}
                <li class="border-b border-border-main">
                    <a
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        class="group flex items-baseline justify-between gap-4 py-4
                               outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <span class="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-text-muted shrink-0">
                            {link.label}
                        </span>
                        <span class="flex items-baseline gap-2 text-text-main group-hover:text-primary transition-colors">
                            <span class="font-serif text-base sm:text-lg underline decoration-border-main underline-offset-[6px] group-hover:decoration-primary transition-colors">
                                {link.value}
                            </span>
                            <ArrowUpRight
                                class="size-4 shrink-0 self-center text-text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all"
                            />
                        </span>
                    </a>
                </li>
            {/each}
        </ul>
    </section>

    <!-- ── Signature ────────────────────────────────────────── -->
    <p class="font-serif italic text-lg text-text-main text-right mb-16">
        &mdash; Kashish
    </p>

    <!-- ── Colophon ─────────────────────────────────────────── -->
    <footer class="border-t-2 border-text-main pt-5">
        <p class="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-muted mb-3">
            Colophon
        </p>
        <p class="font-mono text-xs leading-relaxed text-text-muted">
            Set in Source Serif 4 and Inter. Built with Svelte and Tailwind.
            Served from a repurposed laptop behind an mTLS tunnel, Mohali, Punjab.
            Deployed by a symlink.
        </p>
    </footer>
</div>

<style>
    /* Hanging section marks — they sit in the margin when there is one,
       and fold back above the heading when there isn't. */
    .section-mark {
        display: block;
        margin-bottom: 0.75rem;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 0.65rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--primary);
    }

    @media (min-width: 1280px) {
        .section-mark {
            position: absolute;
            top: 0.35rem;
            left: -5.5rem;
            margin-bottom: 0;
            text-align: right;
            width: 4rem;
        }
    }

    /* Small caps rule above each section body */
    .mark-inline {
        margin-bottom: 1.75rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--border-main);
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: var(--text-main);
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
