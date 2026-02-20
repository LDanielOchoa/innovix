<template>
  <button
    class="nav__item"
    :class="{ 'nav__item--activo': isActive, 'nav__item--colapsado': isCollapsed }"
    @click="$emit('click')"
    :title="isCollapsed ? label : ''"
  >
    <!-- Indicador activo lateral -->
    <span class="nav__indicador-activo"></span>

    <div class="nav__item-icono">
      <component :is="iconComponent" :size="19" />
    </div>

    <span class="nav__item-etiqueta">{{ label }}</span>

    <div v-if="badge" class="nav__item-badge" :class="badgeType">
      {{ badge }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  IconLayoutDashboard,
  IconActivity,
  IconMap2,
  IconShieldCheck,
  IconSettings,
} from '@tabler/icons-vue';

const props = defineProps<{
  isActive: boolean;
  isCollapsed: boolean;
  label: string;
  iconName: string;
  badge?: string;
  badgeType?: string;
}>();

defineEmits<{
  (e: 'click'): void;
}>();

const mapaIconos: Record<string, any> = {
  IconLayoutDashboard,
  IconActivity,
  IconMap2,
  IconShieldCheck,
  IconSettings,
};

const iconComponent = computed(() => mapaIconos[props.iconName] || IconLayoutDashboard);
</script>

<style scoped>
/* ── Ítem base ── */
.nav__item {
  all: unset;
  display: flex;
  align-items: center;
  padding: 0.7rem 0.75rem;
  border-radius: 10px;
  color: var(--iv-text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    padding 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.nav__item:hover {
  background-color: var(--iv-item-hover);
  color: var(--iv-primary);
}

.nav__item--activo {
  background-color: rgba(0, 159, 227, 0.1);
  color: var(--iv-primary);
}

/* Indicador de barra lateral izquierda */
.nav__indicador-activo {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 3px;
  height: 60%;
  border-radius: 0 3px 3px 0;
  background-color: var(--iv-primary);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__item--activo .nav__indicador-activo {
  transform: translateY(-50%) scaleY(1);
}

/* Icono */
.nav__item-icono {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 9px;
  color: inherit;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

/* ── Comportamiento colapsado ── */
.nav__item--colapsado {
  justify-content: center;
  padding: 0.35rem 0;
  border-radius: 0;
  background-color: transparent !important;
}

.nav__item--colapsado:hover {
  background-color: transparent !important;
}

.nav__item--colapsado.nav__item--activo {
  background-color: transparent !important;
}

.nav__item--colapsado .nav__item-icono {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background-color: transparent;
}

.nav__item--colapsado:hover .nav__item-icono {
  background-color: var(--iv-item-hover);
}

.nav__item--colapsado.nav__item--activo .nav__item-icono {
  background-color: rgba(0, 159, 227, 0.12);
}

/* Etiqueta */
.nav__item-etiqueta {
  margin-left: 10px;
  flex: 1;
  overflow: hidden;
  opacity: 1;
  max-width: 200px;
  transition:
    opacity 0.15s ease,
    max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__item--colapsado .nav__item-etiqueta {
  opacity: 0;
  max-width: 0;
  margin-left: 0;
}

/* Badge */
.nav__item-badge {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
  background-color: var(--iv-surface);
  color: var(--iv-text-muted);
  flex-shrink: 0;
  opacity: 1;
  transition: opacity 0.15s ease;
}

.nav__item-badge.live {
  background-color: rgba(0, 159, 227, 0.12);
  color: var(--iv-primary);
}

.nav__item--colapsado .nav__item-badge {
  opacity: 0;
  width: 0;
  padding: 0;
  overflow: hidden;
}
</style>
