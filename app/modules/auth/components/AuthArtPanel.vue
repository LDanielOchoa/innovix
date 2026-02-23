<template>
  <div 
    class="auth-art"
    :class="{ 'auth-art--oculto': paso === 'otp' }"
  >
    <div class="auth-art__container">
      <img :src="bannerUrl" alt="" class="auth-art__bg" />
      <div class="auth-art__overlay"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bannerUrl from '~/assets/Banner_principal_V2.svg?url';

defineProps<{
  paso: 'login' | 'otp';
}>();
</script>

<style scoped>
.auth-art {
  flex: 1.2;
  display: flex;
  padding: 1.5rem;
  transition: flex 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease, padding 0.6s ease;
}

.auth-art--oculto {
  flex: 0;
  padding: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
}

.auth-art__container {
  width: 100%;
  height: 100%;
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  color: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.auth-art__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
  z-index: 1;
}

.auth-art__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top right,
    rgba(15, 23, 42, 0.85) 0%,
    rgba(15, 23, 42, 0.4) 40%,
    rgba(0, 159, 227, 0.2) 100%
  );
  z-index: 2;
}

@media (max-width: 1024px) {
  .auth-art { display: none; }
}
</style>
