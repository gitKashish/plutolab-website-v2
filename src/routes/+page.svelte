<script lang="ts">
    import ArrowRight from "@lucide/svelte/icons/arrow-right";
    import Terminal from "@lucide/svelte/icons/terminal";
    import BookOpen from "@lucide/svelte/icons/book-open";
    import ChevronLeft from "@lucide/svelte/icons/chevron-left";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    
    let { data } = $props();

    // Pagination State
    let currentPage = $state(1);
    const itemsPerPage = 3; 

    // Automatically recalculate when currentPage changes
    let totalPages = $derived(Math.ceil(data.activityLog.length / itemsPerPage));
    let paginatedLog = $derived(
        data.activityLog.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );

    function nextPage() {
        if (currentPage < totalPages) currentPage++;
    }

    function prevPage() {
        if (currentPage > 1) currentPage--;
    }
</script>

<div class="max-w-2xl mx-auto px-4 sm:px-0 py-6">
    <header class="mb-16">
        <h1 class="text-6xl font-serif font-medium text-text-main mb-6 tracking-tight">
            PlutoLab
        </h1>
        <p class="text-xl text-text-muted font-serif leading-relaxed">
            An independent research and development workspace. Focused on creating extensible tools and pragmatic self-hosted architecture.
        </p>
    </header>

    <section>
        <div class="border-b border-border-main pb-4 mb-6 flex justify-between items-end">
            <h2 class="text-sm font-bold tracking-widest text-text-muted">
                Activity Log
            </h2>
            <span class="text-xs font-mono text-text-muted opacity-70">
                Page {currentPage}/{totalPages || 1}
            </span>
        </div>

        <div class="space-y-4">
            {#each paginatedLog as item}
                <a 
                    href={item.link} 
                    class="group block p-6 bg-surface border border-border-main hover:border-border-hover hover:shadow-sm transition-all duration-300 relative overflow-hidden rounded-2xl"
                >
                    <!-- Using primary/5 allows Tailwind to automatically apply opacity to our CSS variable hex code! -->
                    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div class="relative z-10">
                        <div class="flex items-center gap-3 text-xs font-mono mb-3">
                            {#if item.type === 'RELEASE'}
                                <span class="flex items-center gap-1.5 text-primary font-semibold tracking-wider">
                                    <Terminal class="size-3.5" /> RELEASE
                                </span>
                            {:else}
                                <span class="flex items-center gap-1.5 text-text-muted font-semibold tracking-wider">
                                    <BookOpen class="size-3.5" /> NOTES
                                </span>
                            {/if}
                            <span class="text-border-main">•</span>
                            <time class="text-text-muted">{item.date.replace(/-/g, '.')}</time>
                        </div>
                        
                        <div class="flex items-start justify-between gap-4 mb-2">
                            <h3 class="text-xl font-semibold {item.type === 'NOTES' ? 'font-serif' : ''} text-text-main group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                            <ArrowRight class="size-5 shrink-0 text-text-muted group-hover:text-primary transform translate-x-0 group-hover:translate-x-1 transition-all" />
                        </div>
                        
                        <p class="text-text-muted leading-relaxed text-sm">
                            {item.description}
                        </p>
                    </div>
                </a>
            {/each}
        </div>

        <!-- Pagination Controls -->
        {#if totalPages > 1}
            <div class="flex items-center justify-between mt-8 pt-6 border-t border-border-main">
                <button 
                    onclick={prevPage}
                    disabled={currentPage === 1}
                    class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-text-muted hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft class="size-4" /> Newer
                </button>
                
                <button 
                    onclick={nextPage}
                    disabled={currentPage === totalPages}
                    class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-text-muted hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Older <ChevronRight class="size-4" />
                </button>
            </div>
        {/if}
    </section>
</div>