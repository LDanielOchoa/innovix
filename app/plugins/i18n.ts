import { createI18n } from 'vue-i18n';
import es from '../core/i18n/infrastructure/locales/es.json';
import en from '../core/i18n/infrastructure/locales/en.json';
import { useLocaleStore } from '../core/i18n/application/useLocale';
import { watch } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
    const localeStore = useLocaleStore();

    if (import.meta.client) {
        localeStore.initLocale();
    }

    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: localeStore.currentLocale,
        fallbackLocale: 'es',
        messages: { es, en }
    });

    watch(() => localeStore.currentLocale, (newLocale) => {
        (i18n.global.locale as any).value = newLocale;
    });

    nuxtApp.vueApp.use(i18n);

    return {
        provide: {
            i18n: i18n.global
        }
    };
});
