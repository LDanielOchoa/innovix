<template>
  <div class="test-content">
    <h1>Innovix</h1>
    <p>Navega a la sección de mapa mediante el menú lateral.</p>
  </div>
</template>

<script setup lang="ts">
import { useNavigationStore } from '~/core/navigation/application/useNavigation';
import { onMounted } from 'vue';

const navStore = useNavigationStore();

onMounted(() => {
  navStore.setActive('dashboard');
});
</script>

<style scoped>
.test-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 5rem);
}

.test-content h1 {
  font-size: 4rem;
  color: var(--iv-text-main);
  opacity: 0.1;
  font-weight: 800;
  letter-spacing: -2px;
  margin: 0;
}

.test-content p {
  color: var(--iv-text-muted);
  font-weight: 500;
}
</style>
