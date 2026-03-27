<script lang="ts">
    import { page } from '$app/state';

    let {
        title = "PlutoLab",
        description =  "An independent research and development workspace.",
        image = "https://plutolab.org/assets/images/plutolab.png",
        type = "website"
    } = $props();

    // Dynamically get the current URL of the page
    const url = $derived(`https://plutolab.org${page.url.pathname}`);
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Open Graph Data -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />

    <!-- Twitter Card Data -->
    <meta name="twitter:card" content="summary_large_image"  />
    <meta name="twitter:title" content={title}  />
    <meta name="twitter:description" content={description}  />
    <meta name="twitter:image" content={image}  />

</svelte:head>