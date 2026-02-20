<template>
  <div class="main-layout">
    <BarraLateral />
    <main
      class="pagina-contenido"
      :class="{ 'pagina-contenido--colapsado': navStore.estaColapsado }"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useNavigationStore } from '~/core/navigation/application/useNavigation';

const navStore = useNavigationStore();
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--iv-bg);
  transition: var(--iv-transition);
}

.pagina-contenido {
  margin-left: 280px;
  flex: 1;
  padding: 2.5rem;
  transition: margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.pagina-contenido--colapsado {
  margin-left: 72px;
}

@media (max-width: 1024px) {
  .pagina-contenido {
    margin-left: 0;
    padding: 1.5rem;
  }
  .pagina-contenido--colapsado {
    margin-left: 0;
  }
}
</style>
