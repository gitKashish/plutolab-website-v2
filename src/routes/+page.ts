export async function load() {
    // 1. Dynamically fetch all markdown posts
    // { eager: true } compiles the markdown metadata immediately
    const postFiles = import.meta.glob('/src/lib/posts/*.md', { eager: true });
    
    const posts = Object.entries(postFiles).map(([path, file]) => {
        const slug = path.split('/').pop()?.replace('.md', '');
        const meta = (file as Record<string, any>).metadata;
        
        return {
            type: 'NOTES',
            title: meta.title,
            link: `/blog/${slug}`,
            date: meta.date,
            description: meta.description
        };
    });

    // 2. Define your active projects/tools
    // You only touch this array when you release a brand new tool
    const projects = [
        {
            type: 'RELEASE',
            title: 'Kosh v0.3.0',
            link: '/blog/kosh-v0.3.0',
            date: '2026-08-08', // Date of release
            description: 'One Vault Became Many - Profiles, better search, and the filesystem lessons behind them.'
        },
        {
            type: 'RELEASE',
            title: 'Kosh v0.2.3',
            link: '/kosh',
            date: '2026-06-20', // Date of release
            description: 'Smarter Search, Seamless Installs, and Under-the-Hood Polish'
        },
        {
            type: 'RELEASE',
            title: 'Kosh v0.2.0',
            link: '/kosh',
            date: '2026-03-27', // Date of release
            description: 'A command-line credential management tool built with Go.'
        }
    ];

    // 3. Merge both arrays and sort them chronologically (newest first)
    const activityLog = [...posts, ...projects].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // 4. Return the data to the Svelte component
    return { activityLog };
}