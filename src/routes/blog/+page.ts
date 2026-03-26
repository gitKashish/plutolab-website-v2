export async function load() {
    // 1. Fetch all markdown files in the posts directory
    // { eager: true } imports the files immediately so we can read the metadata
    const paths = import.meta.glob('/src/lib/posts/*.md', { eager: true });
    
    // 2. Format the data into an array of objects
    const posts = Object.entries(paths).map(([path, file]) => {
        // Extract the filename without the .md extension to use as the URL slug
        const slug = path.split('/').pop()?.replace('.md', '');
        
        // Extract the YAML frontmatter (title, date, description)
        const metadata = (file as Record<string, any>).metadata;
        
        return { slug, ...metadata };
    });

    // 3. Sort posts chronologically (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // 4. Return the posts to the Svelte component
    return { posts };
}