<template>
  <button
    class="nav__item"
    :class="{ 'nav__item--activo': isActive, 'nav__item--colapsado': isCollapsed }"
    @click="$emit('click')"
    :title="isCollapsed ? label : ''"
  >
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
  padding: 0.55rem 0.75rem;
  border-radius: 12px;
  color: var(--iv-text-secondary);
  font-size: 0.875rem;
  font-weight: 550;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}


.nav__item--activo {
  background-color: rgba(0, 159, 227, 0.08);
  color: var(--iv-primary);
}

.nav__item--activo:hover {
  background-color: rgba(0, 159, 227, 0.1);
  color: var(--iv-primary);
}

.nav__item-icono {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: inherit;
  border-radius: 12px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__item--colapsado {
  justify-content: center;
  padding: 0;
  background-color: transparent !important;
}

.nav__item--colapsado:hover {
  background-color: transparent !important;
}

.nav__item--colapsado.nav__item--activo {
  background-color: transparent !important;
}

.nav__item--colapsado .nav__item-icono {
  width: 42px;
  height: 42px;
}

.nav__item--colapsado:hover .nav__item-icono {
  background-color: rgba(0, 0, 0, 0.03);
}

.nav__item--colapsado.nav__item--activo .nav__item-icono {
  background-color: rgba(0, 159, 227, 0.1);
  color: var(--iv-primary);
}

.nav__item-etiqueta {
  margin-left: 12px;
  flex: 1;
  overflow: hidden;
  opacity: 1;
  max-width: 200px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__item--colapsado .nav__item-etiqueta {
  opacity: 0;
  max-width: 0;
  margin-left: 0;
}

.nav__item-badge {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 99px;
  background-color: var(--iv-surface);
  color: var(--iv-text-muted);
  flex-shrink: 0;
  opacity: 1;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__item-badge.live {
  background-color: rgba(0, 159, 227, 0.12);
  color: var(--iv-primary);
}

.nav__item--activo .nav__item-badge {
  background-color: rgba(0, 159, 227, 0.12);
  color: var(--iv-primary);
}

.nav__item--colapsado .nav__item-badge {
  opacity: 0;
  max-width: 0;
  padding: 0;
  overflow: hidden;
}
</style>
