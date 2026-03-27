import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        // Dynamically import the markdown file based on the URL slug
        const post = await import(`../../../lib/posts/${params.slug}.md`);
        
        return {
            // MDSvex exposes the markdown content as a default Svelte component
            content: post.default,
            // It also exposes the YAML frontmatter as metadata
            meta: post.metadata,
            slug: params.slug
        };
    } catch (e) {
        // If the file doesn't exist, throw a 404
        error(404, `Could not find post: ${params.slug}`);
    }
}