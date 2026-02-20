<template>
  <div class="locale-switcher" :class="{ 'locale-switcher--colapsado': isCollapsed }">
    <button
      @click="localeStore.setLocale('es')"
      :class="{ activo: localeStore.currentLocale === 'es' }"
      title="Español"
    >ES</button>
    <button
      @click="localeStore.setLocale('en')"
      :class="{ activo: localeStore.currentLocale === 'en' }"
      title="English"
    >EN</button>
  </div>
</template>

<script setup lang="ts">
import { useLocaleStore } from '~/core/i18n/application/useLocale';

defineProps<{
  isCollapsed: boolean;
}>();

const localeStore = useLocaleStore();
</script>

<style scoped>
.locale-switcher {
  display: flex;
  gap: 2px;
  background-color: var(--iv-surface);
  padding: 3px;
  border-radius: 8px;
  border: 1px solid var(--iv-border);
  width: fit-content;
  overflow: hidden;
  max-width: 200px;
  opacity: 1;
  transition:
    opacity 0.15s ease,
    max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Comportamiento colapsado ── */
.locale-switcher--colapsado {
  opacity: 0;
  max-width: 0;
  padding: 0;
  border-width: 0;
}

.locale-switcher button {
  all: unset;
  font-size: 0.58rem;
  font-weight: 800;
  padding: 4px 7px;
  border-radius: 5px;
  cursor: pointer;
  color: var(--iv-text-secondary);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.locale-switcher button:hover:not(.activo) {
  color: var(--iv-primary);
}

.locale-switcher button.activo {
  background-color: var(--iv-primary);
  color: white;
}
</style>
