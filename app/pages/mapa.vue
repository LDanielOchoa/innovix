<template>
  <div
    class="page-mapa-container"
    :class="{ 'mapa--sidebar-colapsado': navStore.estaColapsado }"
  >
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
  document.querySelector('.pagina-contenido')?.classList.add('layout-reset-padding');
});

onUnmounted(() => {
  document.querySelector('.pagina-contenido')?.classList.remove('layout-reset-padding');
});
</script>

<style>

.layout-reset-padding {
  padding: 0 !important;
  overflow: hidden;
}


.page-mapa-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 280px;
  z-index: 1;
  transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.mapa--sidebar-colapsado {
  left: 72px;
}

@media (max-width: 1024px) {
  .page-mapa-container {
    left: 0;
  }
}
</style>
