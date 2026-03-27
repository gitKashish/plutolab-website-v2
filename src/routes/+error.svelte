<script lang="ts">
    import { page } from '$app/state';
    import ArrowLeft from "@lucide/svelte/icons/arrow-left";
    import SEO from "$lib/components/SEO.svelte";

    // Derived values for clean templating
    let status = $derived(page.status);
    let message = $derived(page.error?.message || "Something went wrong.");
    
    // Customize the friendly message based on the error code
    let friendlyMessage = $derived(
        status === 404 
            ? "We couldn't find the page you're looking for. It might have been moved or deleted." 
            : "An unexpected error occurred. We're looking into it."
    );
</script>

<SEO title="{status} | PlutoLab" description={message} />

<div class="max-w-2xl mx-auto px-4 sm:px-0 py-6">
    <header class="mb-12 flex justify-between items-end">
        <div>
            <h1 class="text-6xl font-medium text-text-main mb-4 tracking-tight">{status}</h1>

            <p class="text-lg text-text-main font-serif mb-6">
                {message}
            </p>
            <p class="text-lg text-text-muted">
                {friendlyMessage}
            </p>
        </div>
    </header>
    
    <div class="space-y-6">
        <!-- Action Button -->
        <a 
            href="/" 
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-bg rounded-xl font-medium hover:bg-primary-hover transition-colors shadow-sm"
        >
            <ArrowLeft class="size-4" />
            Back to Home
        </a>
    </div>
</div>