<script lang="ts">
    import ArrowRight from "@lucide/svelte/icons/arrow-right";
    import Calendar from "@lucide/svelte/icons/calendar";
    import ChevronLeft from "@lucide/svelte/icons/chevron-left";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    // import SEO from "$lib/components/SEO.svelte";
    
    let { data } = $props();

    // Pagination State
    let currentPage = $state(1);
    const itemsPerPage = 3; 

    let totalPages = $derived(Math.ceil(data.posts.length / itemsPerPage));
    let paginatedPosts = $derived(
        data.posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );

    function nextPage() {
        if (currentPage < totalPages) currentPage++;
    }

    function prevPage() {
        if (currentPage > 1) currentPage--;
    }
</script>

<!-- <SEO title="Blog | PlutoLab" description="Notes on software, systems, and building things." /> -->

<div class="max-w-2xl mx-auto px-4 sm:px-0 py-6">
    <header class="mb-12 flex justify-between items-end">
        <div>
            <h1 class="text-6xl font-medium text-text-main mb-4 tracking-tight">Blog</h1>
            <p class="text-lg text-text-muted">
                Notes on software, systems, and building things.
            </p>
        </div>
        <span class="text-xs font-mono text-text-muted opacity-70 mb-1">
            Page {currentPage}/{totalPages || 1}
        </span>
    </header>
    
    <div class="space-y-6">
        <!-- Iterate over paginatedPosts -->
        {#each paginatedPosts as post}
            <a 
                href="/blog/{post.slug}" 
                class="group block p-6 bg-surface border border-border-main rounded-2xl hover:border-border-hover hover:shadow-sm transition-all duration-300 relative overflow-hidden"
            >
                <!-- Uses primary/5 to tint the background gradient dynamically based on the theme -->
                <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div class="relative z-10">
                    <div class="flex items-center gap-2 text-xs font-mono text-text-muted mb-3">
                        <Calendar class="size-3.5" />
                        <time datetime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                    </div>
                    
                    <div class="flex items-start justify-between gap-4 mb-2">
                        <h2 class="text-xl font-semibold text-text-main group-hover:text-primary transition-colors">
                            {post.title}
                        </h2>
                        <ArrowRight class="size-5 text-text-muted group-hover:text-primary transform translate-x-0 group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <p class="text-text-muted leading-relaxed text-sm">
                        {post.description}
                    </p>
                </div>
            </a>
        {/each}
    </div>

    <!-- Pagination Controls -->
    {#if totalPages > 1}
        <div class="flex items-center justify-between mt-10">
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
</div>