<script lang="ts">
    import { Tabs } from "bits-ui";
    import ExternalLink from "@lucide/svelte/icons/external-link";
    import ArrowRight from "@lucide/svelte/icons/arrow-right";
    import SEO from "$lib/components/SEO.svelte";

    const projectCategories = [
        {
            title: "Active Projects",
            value: "active",
            projects: [
                {
                    title: "Kosh",
                    internalUrl: "/kosh",
                    status: "Active",
                    meta: "CLI Password Manager",
                    description: "A simple, secure command-line password manager built with a focus on security and usability. Kosh uses strong encryption to protect your credentials while maintaining an intuitive command-line interface. The project emphasizes doing one thing well: managing passwords without complexity.",
                    tech: ["Go", "SQLite", "Security", "Encryption"],
                    links: [
                        { label: "Documentation", url: "https://kosh.plutolab.org" },
                        { label: "Source Code", url: "https://git.plutolab.org/plutolab/kosh" }
                    ]
                },
                {
                    title: "PlutoLab Website",
                    status: "Active",
                    meta: "Personal Website & Portfolio",
                    description: "This website itself is a project in modern, minimal web development. Built with Svelte 5 and Tailwind v4, it showcases how clean code and thoughtful design can create elegant experiences without heavy frameworks.",
                    tech: ["Svelte 5", "Tailwind v4", "TypeScript", "Self-hosted"],
                    links: [
                        { label: "Source Code", url: "https://git.plutolab.org/plutolab/plutolab-website-v2" }
                    ]
                }
            ]
        },
        {
            title: "In Development",
            value: "development",
            projects: [
                {
                    title: "Sanket",
                    status: "In Progress",
                    meta: "Automation & CI/CD",
                    description: "A lightweight webhook receiver designed for automating deployments and integrations. The server handles Git push events from Forgejo and triggers custom workflows. Built with simplicity in mind—minimal configuration, reliable execution, and easy to understand.",
                    tech: ["Zig", "Webhooks", "Automation", "Git"],
                    links: []
                }
            ]
        },
        {
            title: "Infrastructure",
            value: "infrastructure",
            projects: [
                {
                    title: "Home Server",
                    status: "Active",
                    meta: "Self-hosted Infrastructure",
                    description: "All PlutoLab projects run on a home server—an old laptop repurposed for continuous service. This setup gives complete control over the infrastructure and serves as a learning platform for systems administration, networking, and deployment practices.",
                    tech: ["Linux", "Self-hosted", "Networking"],
                    links: []
                },
                {
                    title: "Forgejo Instance",
                    status: "Active",
                    meta: "Self-hosted Git Forge",
                    description: "A self-hosted Forgejo instance serving as the central repository for all projects. This provides complete ownership of source code, issue tracking, and collaboration tools. Running your own Git forge means understanding the full development workflow and maintaining control over your data.",
                    tech: ["Forgejo", "Git", "Self-hosted"],
                    links: [
                        { label: "Browse Repositories", url: "https://git.plutolab.org" }
                    ]
                }
            ]
        }
    ];
</script>

<SEO 
    title="Projects | PlutoLab"
    description="Projects built at PlutoLab with simplicity and clarity in mind." 
    image="https://plutolab.org/assets/images/projects.png"
/>

<div class="max-w-2xl mx-auto px-4 sm:px-0 py-6">
    <header class="mb-12">
        <h1 class="text-6xl font-medium text-text-main mb-4 tracking-tight">Projects</h1>
        <p class="text-lg text-text-muted">
            Things I've built with simplicity and clarity in mind.
        </p>
    </header>

    <Tabs.Root value="active" class="w-full">
        <!-- Changed border to border-border-main -->
        <Tabs.List class="flex w-full items-center gap-6 border-b border-border-main mb-8 overflow-x-auto hide-scrollbar">
            {#each projectCategories as category}
                <Tabs.Trigger 
                    value={category.value}
                    class="pb-4 text-sm font-bold uppercase tracking-widest text-text-muted hover:text-text-main data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-colors whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 dark:focus-visible:ring-offset-gray-950"
                >
                    {category.title}
                </Tabs.Trigger>
            {/each}
        </Tabs.List>

        {#each projectCategories as category}
            <Tabs.Content value={category.value} class="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
                <div class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {#each category.projects as project}
                        <!-- Changed background and borders -->
                        <article class="group p-6 bg-surface border border-border-main rounded-2xl transition-all duration-300 relative overflow-hidden
                            {project.status === 'Active' ? 'hover:border-border-hover hover:shadow-sm' : 'border-dashed'}">
                            
                            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 relative z-20">
                                <div>
                                    <!-- Changed title text and hover -->
                                    <h3 class="text-xl font-semibold text-text-main mb-1 flex items-center gap-2">
                                        {#if project.internalUrl}
                                            <a href={project.internalUrl} class="focus:outline-none group-hover:text-primary transition-colors">
                                                <span class="absolute inset-0 z-10" aria-hidden="true"></span>
                                                {project.title}
                                            </a>
                                            <!-- Changed arrow hover -->
                                            <ArrowRight class="size-4 text-text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all" />
                                        {:else}
                                            {project.title}
                                        {/if}
                                    </h3>
                                    <!-- Changed meta text -->
                                    <p class="text-sm font-mono text-text-muted">
                                        {project.meta}
                                    </p>
                                </div>
                                
                                <!-- These badges remain hardcoded to green/amber as they indicate status, not theme -->
                                {#if project.status === 'Active'}
                                    <span class="self-start inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50 shrink-0">
                                        Active
                                    </span>
                                {:else}
                                    <span class="self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50 shrink-0">
                                        In Progress
                                    </span>
                                {/if}
                            </div>

                            <div class="relative">
                                <div class={project.status === 'In Progress' ? 'blur-[6px] opacity-40 grayscale select-none pointer-events-none transition-all duration-700' : ''} aria-hidden={project.status === 'In Progress'}>
                                    <!-- Changed description text -->
                                    <p class="text-text-muted leading-relaxed text-sm mb-6">
                                        {project.description}
                                    </p>

                                    <div class="flex flex-wrap gap-2 mb-6">
                                        {#each project.tech as tag}
                                            <!-- Changed tag background, text, and border -->
                                            <span class="px-2.5 py-1 bg-surface-hover text-text-muted text-xs font-medium rounded-md border border-border-main">
                                                {tag}
                                            </span>
                                        {/each}
                                    </div>
                                </div>
                            </div>

                            {#if project.links.length > 0 && project.status === 'Active'}
                                <!-- Changed border top -->
                                <div class="flex flex-wrap gap-6 pt-4 border-t border-border-main relative z-20">
                                    {#each project.links as link}
                                        <!-- Changed link and icon hover colors -->
                                        <a 
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            class="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                                        >
                                            {link.label}
                                            <ExternalLink class="size-3.5 text-primary opacity-80 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                                        </a>
                                    {/each}
                                </div>
                            {/if}
                            
                        </article>
                    {/each}
                </div>
            </Tabs.Content>
        {/each}
    </Tabs.Root>
</div>
