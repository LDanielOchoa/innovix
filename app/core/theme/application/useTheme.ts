import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDarkMode: false,
    }),
    actions: {
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            if (import.meta.client) {
                localStorage.setItem('theme-mode', this.isDarkMode ? 'dark' : 'light');
                this.applyTheme();
            }
        },
        initTheme() {
            if (import.meta.client) {
                const savedTheme = localStorage.getItem('theme-mode');
                if (savedTheme) {
                    this.isDarkMode = savedTheme === 'dark';
                } else {
                    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                }
                this.applyTheme();
            }
        },
        applyTheme() {
            if (import.meta.client) {
                if (this.isDarkMode) {
                    document.documentElement.classList.add('dark-mode');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                }
            }
        }
    }
});
