import { browser } from '$app/environment';

// Global state using Svelte 5 runes
let isDark = $state(false);

export function useTheme() {
	// Initialize state on the client side
	if (browser) {
		isDark = document.documentElement.classList.contains('dark');
	}

	return {
		get isDark() {
			return isDark;
		},
		toggle() {
			isDark = !isDark;
			if (browser) {
				if (isDark) {
					document.documentElement.classList.add('dark');
					localStorage.theme = 'dark';
				} else {
					document.documentElement.classList.remove('dark');
					localStorage.theme = 'light';
				}
			}
		}
	};
}