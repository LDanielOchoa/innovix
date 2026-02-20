<template>
  <button
    class="tema-toggle"
    :class="{ 'tema-toggle--oscuro': themeStore.isDarkMode, 'tema-toggle--colapsado': isCollapsed }"
    @click="themeStore.toggleTheme"
    :title="themeStore.isDarkMode ? $t('theme.switchToLight') : $t('theme.switchToDark')"
  >
    <span class="tema-toggle__pista">
      <span class="tema-toggle__pulgar">
        <component :is="themeStore.isDarkMode ? IconMoon : IconSun" :size="13" />
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
  gap: 0.65rem;
  cursor: pointer;
  padding: 0.5rem 0.6rem;
  border-radius: 12px;
  transition: background-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.tema-toggle:hover {
  background-color: var(--iv-item-hover);
}

.tema-toggle__pista {
  position: relative;
  width: 38px;
  height: 22px;
  border-radius: 11px;
  background-color: var(--iv-surface);
  border: 1.5px solid var(--iv-border);
  flex-shrink: 0;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  display: flex;
  align-items: center;
}

.tema-toggle--oscuro .tema-toggle__pista {
  background-color: rgba(0, 159, 227, 0.15);
  border-color: var(--iv-primary);
}

.tema-toggle__pulgar {
  position: absolute;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--iv-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.3s ease;
}

.tema-toggle--oscuro .tema-toggle__pulgar {
  transform: translateX(16px);
  background-color: var(--iv-primary);
}

.tema-toggle__etiqueta {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--iv-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  opacity: 1;
  max-width: 200px;
  transition:
    opacity 0.15s ease,
    max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Comportamiento colapsado ── */
.tema-toggle--colapsado {
  justify-content: center;
  padding: 0.5rem 0;
}

.tema-toggle--colapsado .tema-toggle__etiqueta {
  opacity: 0;
  max-width: 0;
}
</style>
