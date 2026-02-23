<template>
  <div id="app-root">
    <CargadorGlobal />
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import CargadorGlobal from '~/shared/components/ui/CargadorGlobal.vue';
import { useThemeStore } from '~/core/theme/application/useTheme';
import { onMounted } from 'vue';

useHead({
  script: [
    {
      innerHTML: `
        (function() {
          var tema = localStorage.getItem('theme-mode');
          var esModoOscuro = tema ? tema === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (esModoOscuro) document.documentElement.classList.add('dark-mode');
          document.documentElement.classList.add('sin-transicion');
          window.addEventListener('load', function() {
            document.documentElement.classList.remove('sin-transicion');
          });
        })();
      `,
      tagPosition: 'head',
      tagPriority: 'critical',
    }
  ]
});

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
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

/* Transiciones de página */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.99);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(1.01);
}

.sin-transicion *,
.sin-transicion *::before,
.sin-transicion *::after {
  transition: none !important;
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
