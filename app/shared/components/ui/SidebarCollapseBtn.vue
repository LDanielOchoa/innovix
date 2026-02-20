<template>
  <button
    class="btn-colapso"
    @click="$emit('toggle')"
    :title="isCollapsed ? $t('sidebar.expandir') : $t('sidebar.colapsar')"
  >
    <component :is="isCollapsed ? IconChevronRight : IconChevronLeft" :size="13" />
  </button>
</template>

<script setup lang="ts">
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

defineProps<{
  isCollapsed: boolean;
}>();

defineEmits<{
  (e: 'toggle'): void;
}>();
</script>

<style scoped>
.btn-colapso {
  all: unset;
  position: absolute;
  top: 80px;
  right: -13px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: var(--iv-card-bg);
  border: 1.5px solid var(--iv-border);
  color: var(--iv-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-colapso:hover {
  background-color: var(--iv-primary);
  color: white;
  border-color: var(--iv-primary);
  box-shadow: 0 4px 14px rgba(0, 159, 227, 0.4);
}
</style>
