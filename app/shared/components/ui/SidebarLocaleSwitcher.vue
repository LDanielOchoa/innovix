<template>
  <div class="locale-switcher" :class="{ 'locale-switcher--colapsado': isCollapsed }">
    <button
      v-for="idioma in idiomas"
      :key="idioma.codigo"
      class="locale-btn"
      :class="{ activo: locale === idioma.codigo }"
      @click="setLocale(idioma.codigo)"
      :title="idioma.nombre"
    >
      <span class="locale-bandera">{{ idioma.bandera }}</span>
      <span class="locale-codigo">{{ idioma.codigo.toUpperCase() }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();

defineProps<{
  isCollapsed: boolean;
}>();

const idiomas = [
  { codigo: 'es', nombre: 'Español', bandera: '🇪🇸' },
  { codigo: 'en', nombre: 'English', bandera: '🇺🇸' },
];
</script>

<style scoped>
.locale-switcher {
  display: flex;
  gap: 4px;
  background-color: var(--iv-surface);
  padding: 3px;
  border-radius: 10px;
  border: 1px solid var(--iv-border);
  width: fit-content;
  overflow: hidden;
  max-width: 200px;
  opacity: 1;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Colapsado ── */
.locale-switcher--colapsado {
  opacity: 0;
  max-width: 0;
  padding: 0;
  border-width: 0;
  pointer-events: none;
}

/* ── Botón de idioma ── */
.locale-btn {
  all: unset;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 7px;
  cursor: pointer;
  color: var(--iv-text-secondary);
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
}

.locale-bandera {
  font-size: 0.85rem;
  line-height: 1;
}

.locale-codigo {
  line-height: 1;
}

.locale-btn:hover:not(.activo) {
  color: var(--iv-primary);
  background-color: rgba(0, 0, 0, 0.03);
}

.locale-btn:active {
  transform: scale(0.95);
}

.locale-btn.activo {
  background-color: var(--iv-primary);
  color: white;
}
</style>
