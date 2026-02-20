<template>
  <div class="page-mapa-container">
    <VistaMapa />
  </div>
</template>

<script setup lang="ts">
import VistaMapa from '~/modules/mapa/components/VistaMapa.vue';
import { useNavigationStore } from '~/core/navigation/application/useNavigation';
import { onMounted, onUnmounted } from 'vue';

const navStore = useNavigationStore();


onMounted(() => {
  navStore.setActive('mapa');
  // Agregar clase global al body/main para quitar padding
  document.querySelector('.pagina-contenido')?.classList.add('layout-reset-padding');
});

onUnmounted(() => {
  // Limpiar al salir
  document.querySelector('.pagina-contenido')?.classList.remove('layout-reset-padding');
});
</script>

<style>
/* Resetear padding global de Layout solo para la vista de Mapa */
.layout-reset-padding {
  padding: 0 !important;
  height: 100vh;
  overflow: hidden;
}

.page-mapa-container {
  height: 100vh;
  width: 100%;
}
</style>
