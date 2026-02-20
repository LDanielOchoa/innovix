<template>
  <button
    class="tema-toggle"
    :class="{
      'tema-toggle--oscuro': themeStore.isDarkMode,
      'tema-toggle--colapsado': isCollapsed
    }"
    @click="themeStore.toggleTheme"
    :title="themeStore.isDarkMode ? $t('theme.switchToLight') : $t('theme.switchToDark')"
  >
    <span class="tema-toggle__pista">
      <span class="tema-toggle__pulgar">
        <component :is="themeStore.isDarkMode ? IconMoon : IconSun" :size="12" />
      </span>
    </span>

    <span class="tema-toggle__etiqueta">
      {{ themeStore.isDarkMode ? $t('theme.switchToLight') : $t('theme.switchToDark') }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/core/theme/application/useTheme';
import { IconSun, IconMoon } from '@tabler/icons-vue';

defineProps<{
  isCollapsed: boolean;
}>();

const themeStore = useThemeStore();
</script>

<style scoped>
.tema-toggle {
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  padding: 0.45rem 0.55rem;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.tema-toggle:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

/* ── Pista (track) ── */
.tema-toggle__pista {
  position: relative;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background-color: var(--iv-surface);
  border: 1.5px solid var(--iv-border);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.tema-toggle--oscuro .tema-toggle__pista {
  background-color: rgba(0, 159, 227, 0.12);
  border-color: rgba(0, 159, 227, 0.4);
}

/* ── Pulgar (thumb) ── */
.tema-toggle__pulgar {
  position: absolute;
  left: 2px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: var(--iv-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tema-toggle--oscuro .tema-toggle__pulgar {
  transform: translateX(15px);
  background-color: var(--iv-primary);
}

/* ── Etiqueta ── */
.tema-toggle__etiqueta {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--iv-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  opacity: 1;
  max-width: 200px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Colapsado ── */
.tema-toggle--colapsado {
  justify-content: center;
  padding: 0.45rem 0;
}

.tema-toggle--colapsado .tema-toggle__etiqueta {
  opacity: 0;
  max-width: 0;
}
</style>
