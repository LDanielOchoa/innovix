<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <div class="test-content">
      <h1>{{ $t('common.welcome') }}</h1>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/core/theme/application/useTheme';
import { useLocaleStore } from '~/core/i18n/application/useLocale';
import { onMounted } from 'vue';

const themeStore = useThemeStore();
const localeStore = useLocaleStore();

onMounted(() => {
  themeStore.initTheme();
  localeStore.initLocale();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');

:root {
  --iv-primary: #009fe3;
  --iv-bg: #f5f7fb;
  --iv-surface: #edf2f9;
  --iv-card-bg: #ffffff;
  --iv-sidebar-bg: #ffffff;
  --iv-item-hover: #f4f7f8;
  --iv-text-main: #1e293b;
  --iv-text-secondary: #475569;
  --iv-text-muted: #94a3b8;
  --iv-border: #dde5f0;
  --iv-indicator-active: #48bb78;
  --iv-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark-mode {
  --iv-bg: #0f172a;
  --iv-surface: #1e293b;
  --iv-card-bg: #1e293b;
  --iv-sidebar-bg: #1e293b;
  --iv-item-hover: #334155;
  --iv-text-main: #f8fafc;
  --iv-text-secondary: #cbd5e0;
  --iv-text-muted: #94a3b8;
  --iv-border: #334155;
  --iv-indicator-active: #10b981;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Manrope', sans-serif;
  overflow-x: hidden;
  background-color: var(--iv-bg);
  color: var(--iv-text-main);
  transition: var(--iv-transition);
}

.test-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 5rem);
}

.test-content h1 {
  font-size: 5rem;
  color: var(--iv-text-main);
  opacity: 0.05;
  font-weight: 800;
  letter-spacing: -2px;
}
</style>
