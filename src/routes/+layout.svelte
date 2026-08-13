<script lang="ts">
    import { NavigationMenu, Tooltip } from "bits-ui";
    import Sun from "@lucide/svelte/icons/sun";
    import Moon from "@lucide/svelte/icons/moon";

    import { page } from "$app/state";
    import { onNavigate } from "$app/navigation";
    import { useTheme } from "$lib/theme.svelte";
    import Logo from "$lib/components/Logo.svelte";
    
    import "../app.css";

    let { children } = $props();

    const theme = useTheme();

    const navLinks = [
        { title: "Projects", href: "/projects" },
        { title: "Blog", href: "/blog" },
        { title: "Kosh", href: "/kosh" },
        { title: "About", href: "/about" },
    ];

    // Hook into SvelteKit's router
    onNavigate((navigation) => {
        // Skip view transition in case of same page navigation
        if (navigation.to?.url.pathname === navigation.from?.url.pathname) return;

        // Fallback for browsers that don't support View Transitions
        if (!document.startViewTransition) return;

        // Wrap the DOM update in the View Transition API
        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<Tooltip.Provider>
    <div class="min-h-screen font-sans">
        <!-- Using border-border-main for dark mode border -->
        <header class="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-transparent vt-header">
            <div class="p-6 mx-auto max-w-2xl flex justify-between items-center">
                
                <!-- text-primary automatically handles blue-600/blue-500 switching -->
                <a
                    href="/"
                    class="text-xl font-serif tracking-tight hover:text-primary transition-colors"
                >
                     <Logo strokeWidth={2.4} size={38}></Logo>
                </a>

                <div class="flex items-center gap-4">
                    <NavigationMenu.Root class="relative z-10 flex max-w-max items-center justify-center">
                        <NavigationMenu.List class="group flex flex-1 list-none items-center justify-center space-x-1">
                            {#each navLinks as link}
                                {@const isActive = page.url.pathname.startsWith(link.href)}

                                <NavigationMenu.Item>
                                    <NavigationMenu.Link
                                        href={link.href}
                                        class="
                                            outline-none block select-none rounded-lg px-4 py-2 text-sm font-medium
                                            transition-colors focus-visible:ring-2 focus-visible:ring-primary
                                            {isActive 
                                                ? 'bg-surface-hover text-primary font-semibold' 
                                                : 'text-text-muted hover:bg-surface-hover hover:text-text-main focus-visible:bg-surface-hover'}
                                        "
                                    >
                                        {link.title}
                                    </NavigationMenu.Link>
                                </NavigationMenu.Item>
                            {/each}
                        </NavigationMenu.List>
                    </NavigationMenu.Root>

                    <!-- Theme Toggle Button -->
                    <button
                        onclick={() => theme.toggle()}
                        class="p-2 rounded-lg hover:bg-surface-hover transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
                        aria-label="Toggle Dark Mode"
                    >
                        {#if theme.isDark}
                            <Sun class="size-5" />
                        {:else}
                            <Moon class="size-5" />
                        {/if}
                    </button>
                </div>
            </div>
        </header>

        <main class="max-w-2xl mx-auto p-0 sm:p-6 vt-main">
            {@render children()}
        </main>
    </div>
</Tooltip.Provider>

<style>
    .vt-header {
        view-transition-name: site-header;
    }

    .vt-main {
        view-transition-name: site-main;
    }

    ::view-transition-old(site-main) {
        animation: 200ms cubic-bezier(0.4, 0, 0.2, 1) both fade-out,
                    200ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-top;
    }

    ::view-transition-new(site-main) {
        animation: 250ms cubic-bezier(0.4, 0, 0.2, 1) both fade-in,
                    250ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-bottom;
        }
</style>
