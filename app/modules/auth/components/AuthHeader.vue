<template>
  <header class="auth-header" :class="{ 'auth-header--otp': paso === 'otp' }">
    <div class="auth-header__logo-wrapper">
      <img :src="logoUrl" alt="Innovix" class="auth-header__logo" />
    </div>
    <Transition name="fade-slide" mode="out-in">
      <div :key="paso">
        <h1 class="auth-header__titulo">
          {{ paso === 'login' ? $t('auth.welcome') : $t('auth.otpTitle') }}
        </h1>
        <p class="auth-header__subtitulo">
          {{ paso === 'login' ? $t('auth.subtitle') : $t('auth.otpSubtitle') }}
        </p>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import logoUrl from '~/assets/logo.png';

defineProps<{
  paso: 'login' | 'otp';
}>();
</script>

<style scoped>
.auth-header {
  margin-bottom: 3.5rem;
  width: 100%;
}

.auth-header__logo-wrapper {
  margin-bottom: 2.5rem;
}

.auth-header__logo {
  height: 48px;
  width: auto;
  object-fit: contain;
  /* Filtro para convertir a #00ADF7 */
  filter: brightness(0) saturate(100%) invert(53%) sepia(88%) saturate(3015%) hue-rotate(174deg) brightness(101%) contrast(105%);
}

:global(.dark-mode) .auth-header__logo {
  filter: brightness(0) invert(1);
}

.auth-header__titulo {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 0.75rem;
  color: #0f172a;
  line-height: 1.1;
}

:global(.dark-mode) .auth-header__titulo {
  color: var(--iv-text-main);
}

.auth-header__subtitulo {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  max-width: 320px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .auth-header {
    padding: 1rem 2rem 0;
    margin-bottom: 2rem;
    text-align: center;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    box-sizing: border-box;
    max-height: 300px;
    opacity: 1;
    overflow: hidden;
  }

  .auth-header__logo {
    height: 44px;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .auth-header__titulo {
    font-size: 1.85rem;
    letter-spacing: -1px;
    color: #0f172a;
  }

  :global(.dark-mode) .auth-header__titulo {
    color: var(--iv-text-main);
  }

  .auth-header__subtitulo {
    color: #64748b;
  }
}

/* Transiciones */
.fade-slide-enter-active {
  transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1), transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
