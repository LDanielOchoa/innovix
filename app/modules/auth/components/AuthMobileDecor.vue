<template>
  <div class="auth-decor">
    <div class="auth-decor__mobile">
      <div class="auth-decor__circle auth-decor__circle--1"></div>
      <div class="auth-decor__circle auth-decor__circle--2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const anioActual = computed(() => new Date().getFullYear());
</script>

<style scoped>
.auth-decor {
  display: contents;
}

.auth-decor__mobile {
  display: none;
}

@media (max-width: 768px) {
  .auth-decor__mobile {
    display: none;
  }
}
</style>
