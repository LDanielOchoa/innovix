import { defineStore } from 'pinia';

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        currentLocale: 'es',
    }),
    actions: {
        setLocale(locale: string) {
            if (this.currentLocale === locale) return;
            this.currentLocale = locale;
            if (import.meta.client) {
                localStorage.setItem('user-locale', locale);
            }
        },
        initLocale() {
            if (import.meta.client) {
                const savedLocale = localStorage.getItem('user-locale');
                if (savedLocale) {
                    this.currentLocale = savedLocale;
                } else {
                    const browserLang = (navigator.language || 'es').split('-')[0];
                    if (browserLang && ['es', 'en'].includes(browserLang)) {
                        this.currentLocale = browserLang;
                    } else {
                        this.currentLocale = 'es';
                    }
                }
            }
        }
    }
});
