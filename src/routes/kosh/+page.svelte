<script lang="ts">
    import Terminal from "@lucide/svelte/icons/terminal";
    import ShieldCheck from "@lucide/svelte/icons/shield-check";
    import Fingerprint from "@lucide/svelte/icons/fingerprint";
    import Search from "@lucide/svelte/icons/search";
    import Database from "@lucide/svelte/icons/database";
    import BookOpen from "@lucide/svelte/icons/book-open";
    import GitGraph from "@lucide/svelte/icons/git-graph";
    // import SEO from "$lib/components/SEO.svelte";
</script>

<!-- <SEO 
    title="Kosh | Local-First Password Manager" 
    description="A fast, secure, offline-first command-line password manager." 
/> -->

<div class="max-w-2xl mx-auto px-4 sm:px-0 py-6">
    
    <!-- Hero / Breadcrumb -->
    <div class="mb-8">
        <a href="/projects" class="text-sm font-medium text-text-muted hover:text-primary transition-colors inline-block">
            ← Back to Projects
        </a>
    </div>

    <!-- Asymmetric Bento Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(140px,auto)]">
        
        <!-- Box 1: The Hero Box (Spans full width) -->
        <!-- Now uses bg-primary to perfectly match whatever theme color you set globally! -->
        <div class="col-span-1 sm:col-span-2 rounded-3xl text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-primary/30
            bg-[radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.25),transparent_40%),linear-gradient(to_bottom_right,var(--primary),var(--primary-hover))]">
            
            <div class="relative z-10 mb-8">
                <div class="flex items-center gap-3 mb-4">
                    <Terminal class="size-6 text-white/80" />
                    <span class="px-3 py-1 bg-white/20 border border-white/30 rounded-full text-xs font-bold tracking-wider uppercase text-white">
                        CLI Tool
                    </span>
                </div>
                <h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                    Kosh
                </h1>
                <p class="text-lg text-white/90 leading-relaxed max-w-md">
                    A fast, secure, offline-first command-line password manager. Doing one thing well: managing passwords without complexity.
                </p>
            </div>

            <div class="flex flex-wrap gap-4 relative z-10">
                <!-- Primary Action -->
                <a href="https://kosh.plutolab.org" target="_blank" class="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm">
                    <BookOpen class="size-4.5" />
                    Documentation
                </a>
                <!-- Secondary Action -->
                <a href="https://git.plutolab.org/plutolab/kosh" target="_blank" class="inline-flex items-center gap-2 bg-black/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-black/30 transition-colors">
                    <GitGraph class="size-4.5" />
                    Source
                </a>
            </div>
        </div>

        <!-- Box 2: Local First -->
        <!-- Moved to bg-surface, text-text-main, border-border-main -->
        <div class="col-span-1 rounded-3xl bg-surface border border-border-main p-6 flex flex-col justify-center group hover:border-green-500/50 transition-colors">
            <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-green-500/10 rounded-lg text-green-600 dark:text-green-400">
                    <ShieldCheck class="size-5" />
                </div>
                <h3 class="font-bold text-text-main">Offline by Design</h3>
            </div>
            <p class="text-sm text-text-muted leading-relaxed">
                Zero trust, zero tracking. All encryption happens locally. Your vault never touches the cloud.
            </p>
        </div>

        <!-- Box 3: Advanced Cryptography -->
        <!-- Intentionally left hardcoded dark to create the signature "Bento" contrast -->
        <div class="col-span-1 sm:row-span-2 rounded-3xl bg-gray-900 dark:bg-black text-white border border-gray-800 p-6 flex flex-col justify-between group hover:border-gray-600 transition-colors">
            <div>
                <div class="flex items-center gap-3 mb-3">
                    <div class="p-2 bg-gray-800 rounded-lg text-gray-300">
                        <Fingerprint class="size-5" />
                    </div>
                    <h3 class="font-bold">Modern Crypto</h3>
                </div>
                <p class="text-sm text-gray-400 leading-relaxed mb-6">
                    Secured with the best modern primitives. No outdated algorithms.
                </p>
            </div>
            <ul class="space-y-2 text-xs font-mono text-gray-300">
                <li class="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg"><span class="text-primary">▹</span> Argon2id</li>
                <li class="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg"><span class="text-primary">▹</span> Curve25519</li>
                <li class="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg"><span class="text-primary">▹</span> ChaCha20-Poly1305</li>
            </ul>
        </div>

        <!-- Box 4: Adaptive Search -->
        <div class="col-span-1 rounded-3xl bg-surface border border-border-main p-6 flex flex-col justify-center group hover:border-primary transition-colors">
            <div class="flex items-center gap-3 mb-3">
                <!-- Uses primary/10 to automatically tint based on theme -->
                <div class="p-2 bg-primary/10 rounded-lg text-primary">
                    <Search class="size-5" />
                </div>
                <h3 class="font-bold text-text-main">Adaptive Search</h3>
            </div>
            <p class="text-sm text-text-muted leading-relaxed">
                Fuzzy searching that learns. Results are weighted by frequency and recency.
            </p>
        </div>

        <!-- Box 5: SQLite Vault -->
        <div class="col-span-1 sm:col-span-2 rounded-3xl bg-surface border border-border-main p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 group hover:border-border-hover transition-colors">
            <div class="flex items-center gap-3 sm:shrink-0">
                <div class="p-3 bg-surface-hover rounded-xl text-text-muted">
                    <Database class="size-6" />
                </div>
                <h3 class="font-bold text-text-main text-lg sm:hidden">Encrypted SQLite</h3>
            </div>
            <div>
                <h3 class="font-bold text-text-main text-lg hidden sm:block mb-1">Encrypted SQLite Vault</h3>
                <p class="text-sm text-text-muted leading-relaxed max-w-lg">
                    A single, highly portable file utilizing Write-Ahead Logging and SQLite's secure-delete feature to guarantee that wiped credentials are permanently unrecoverable.
                </p>
            </div>
        </div>

    </div>
</div>