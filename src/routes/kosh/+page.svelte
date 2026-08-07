<script lang="ts">
    import Terminal from "@lucide/svelte/icons/terminal";
    import ShieldCheck from "@lucide/svelte/icons/shield-check";
    import Fingerprint from "@lucide/svelte/icons/fingerprint";
    import Search from "@lucide/svelte/icons/search";
    import Database from "@lucide/svelte/icons/database";
    import Layers from "@lucide/svelte/icons/layers";
    import ArrowRight from "@lucide/svelte/icons/arrow-right";
    import BookOpen from "@lucide/svelte/icons/book-open";
    import GitGraph from "@lucide/svelte/icons/git-graph";
    import SEO from "$lib/components/SEO.svelte";
</script>

<SEO 
    title="Kosh | Local-First Password Manager" 
    description="A fast, secure, offline-first command-line password manager." 
    image="https://plutolab.org/assets/images/kosh.png"
/>

<div class="max-w-2xl mx-auto px-4 sm:px-0 py-6">
    
    <!-- Breadcrumb -->
    <div class="mb-8">
        <a href="/projects" class="text-sm font-medium text-text-muted hover:text-primary transition-colors inline-block">
            ← Back to Projects
        </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(140px,auto)]">
        
        <div class="col-span-1 sm:col-span-2 rounded-3xl text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-primary/30
            bg-[radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.25),transparent_40%),linear-gradient(to_bottom_right,var(--primary),var(--primary-hover))]">
            
            <div class="relative z-10 mb-8">
                <div class="flex items-center gap-3 mb-4">
                    <Terminal class="size-6 text-white/80" />
                    <span class="px-3 py-1 bg-white/20 border border-white/30 rounded-full text-xs font-bold tracking-wider uppercase text-white">
                        CLI Tool
                    </span>
                    <!-- Only version-specific line on this page; update the href and label per release -->
                    <a href="/blog/kosh-v0.3.0" class="group inline-flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-white transition-colors">
                        What's new in v0.3.0
                        <ArrowRight class="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
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

        <!-- Local First -->
        <div class="col-span-1 rounded-3xl bg-surface border border-border-main p-6 flex flex-col group hover:border-green-500/50 transition-colors">
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

        <!-- Advanced Cryptography -->
        <div class="col-span-1 rounded-3xl bg-gray-900 dark:bg-black text-white border border-gray-800 p-6 flex flex-col group hover:border-gray-600 transition-colors">
            <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-gray-800 rounded-lg text-gray-300">
                    <Fingerprint class="size-5" />
                </div>
                <h3 class="font-bold">Modern Crypto</h3>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed mb-4">
                Secured with the best modern primitives. No outdated algorithms.
            </p>
            <!-- mt-auto keeps the chips on the card floor when the grid row stretches -->
            <ul class="flex flex-wrap gap-2 mt-auto text-xs font-mono text-gray-300">
                <li class="bg-gray-800/50 px-2.5 py-1.5 rounded-lg">Argon2id</li>
                <li class="bg-gray-800/50 px-2.5 py-1.5 rounded-lg">Curve25519</li>
                <li class="bg-gray-800/50 px-2.5 py-1.5 rounded-lg">ChaCha20-Poly1305</li>
            </ul>
        </div>

        <!-- Adaptive Search -->
        <div class="col-span-1 rounded-3xl bg-surface border border-border-main p-6 flex flex-col group hover:border-primary transition-colors">
            <div class="flex items-center gap-3 mb-3">
                <!-- Uses primary/10 to automatically tint based on theme -->
                <div class="p-2 bg-primary/10 rounded-lg text-primary">
                    <Search class="size-5" />
                </div>
                <h3 class="font-bold text-text-main">Adaptive Search</h3>
            </div>
            <p class="text-sm text-text-muted leading-relaxed">
                Tolerates typos and abbreviations. <code class="font-mono text-xs text-text-main">kosh gpat</code> finds <code class="font-mono text-xs text-text-main">git_personal_access_token</code>, ranked by match quality, then recency and frequency.
            </p>
        </div>

        <!-- Profiles -->
        <div class="col-span-1 rounded-3xl bg-surface border border-border-main p-6 flex flex-col group hover:border-primary transition-colors">
            <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-primary/10 rounded-lg text-primary">
                    <Layers class="size-5" />
                </div>
                <h3 class="font-bold text-text-main">Isolated Profiles</h3>
            </div>
            <p class="text-sm text-text-muted leading-relaxed mb-4">
                Separate vaults for work, personal, or anything else — each with its own master password and keypair. Unlocking one grants no access to any other.
            </p>
            <ul class="flex flex-wrap gap-2 mt-auto text-xs font-mono">
                <li class="bg-surface-hover border border-border-main px-2.5 py-1.5 rounded-lg text-text-muted">kosh profile create work</li>
                <li class="bg-surface-hover border border-border-main px-2.5 py-1.5 rounded-lg text-text-muted">kosh use personal</li>
            </ul>
        </div>

        <!-- SQLite Vault -->
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
                    A single, highly portable file using Write-Ahead Logging. Deleted vaults are overwritten with random bytes on top of SQLite's secure-delete — best-effort on modern SSDs, which is why everything is encrypted at rest: whatever survives on disk is ciphertext with no key.
                </p>
            </div>
        </div>

    </div>
</div>