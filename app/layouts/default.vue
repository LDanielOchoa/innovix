<template>
  <div class="main-layout">
    <BarraLateral />
    <main class="page-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--iv-bg);
  transition: var(--iv-transition);
}

.page-content {
  margin-left: 280px; /* Ancho del sidebar */
  flex: 1;
  padding: 2.5rem;
  transition: margin-left 0.3s ease;
}

@media (max-width: 1024px) {
  .page-content {
    margin-left: 0;
    padding: 1.5rem;
  }
}
</style>
