<script lang="ts">
    import SEO from "$lib/components/SEO.svelte";

    let { data } = $props();
    // svelte-ignore state_referenced_locally
    const { content: Content, meta, slug } = data;
</script>

<SEO 
    title="{meta.title} · PlutoLab" 
    description={meta.description || "Read this article on PlutoLab."} 
    image={`https://plutolab.org/assets/images/blog/${slug}/og.png`}
    type="article"
/>

<div class="max-w-2xl mx-auto px-4 sm:px-0 py-6">
    <!-- Breadcrumb -->
    <div class="mb-8 py-6">
        <a href="/blog" class="text-sm font-medium text-text-muted hover:text-primary transition-colors inline-block">
            ← Back to Blog
        </a>
    </div>
    
    <article class="max-w-2xl mx-auto">
        <header class="mb-10">
            <!-- Replaced hardcoded text colors with semantic variables -->
            <h1 class="text-4xl font-bold text-text-main mb-4 tracking-tight">{meta.title}</h1>
            <p class="text-text-muted font-mono text-sm">{meta.date}</p>
        </header>
        
        <!-- This is where the magic happens -->
        <!-- Note: We keep `dark:prose-invert` here because the @tailwindcss/typography plugin uses it to invert standard markdown elements (like blockquotes and bold text) automatically -->
        <div class="prose dark:prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary-hover prose-a:transition-colors">
            <Content />
        </div>
    </article>
</div>