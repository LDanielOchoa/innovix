<template>
  <div class="login">
    <div class="login__contenedor">
      <!-- PANEL IZQUIERDO: FORMULARIO (Estilo Abierto y Refinado) -->
      <div class="login__panel-formulario">
        <div class="login__inner">
          <header class="login__header">
            <div class="login__logo-wrapper">
              <img :src="logoUrl" alt="Innovix" class="login__logo" />
            </div>
            <h1 class="login__titulo">{{ t('auth.welcome') }}</h1>
            <p class="login__subtitulo">{{ t('auth.subtitle') }}</p>
          </header>

          <form class="login__form" @submit.prevent="iniciarSesion">
            <!-- Usuario -->
            <div class="login__campo">
              <label class="login__label" for="usuario">{{ t('auth.userLabel') }}</label>
              <div class="login__input-wrapper" :class="{ 'login__input-wrapper--focus': campoEnfocado === 'usuario' }">
                <IconUser class="login__input-icon" :size="20" />
                <input
                  id="usuario"
                  v-model="credenciales.usuario"
                  type="text"
                  :placeholder="t('auth.userPlaceholder')"
                  class="login__input"
                  @focus="campoEnfocado = 'usuario'"
                  @blur="campoEnfocado = ''"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="login__campo">
              <label class="login__label" for="contrasena">{{ t('auth.passLabel') }}</label>
              <div class="login__input-wrapper" :class="{ 'login__input-wrapper--focus': campoEnfocado === 'contrasena' }">
                <IconLock class="login__input-icon" :size="20" />
                <input
                  id="contrasena"
                  v-model="credenciales.contrasena"
                  :type="mostrarContrasena ? 'text' : 'password'"
                  :placeholder="t('auth.passPlaceholder')"
                  class="login__input"
                  @focus="campoEnfocado = 'contrasena'"
                  @blur="campoEnfocado = ''"
                />
                <button
                  type="button"
                  class="login__view-toggle"
                  @click="mostrarContrasena = !mostrarContrasena"
                >
                  <component :is="mostrarContrasena ? IconEyeOff : IconEye" :size="18" />
                </button>
              </div>
            </div>

            <!-- Opciones Extra -->
            <div class="login__opciones-fila">
              <label class="login__checkbox-label">
                <div class="login__checkbox-wrapper">
                  <input type="checkbox" v-model="recordarme" class="login__checkbox-input" />
                  <span class="login__checkbox-custom">
                    <IconCheck v-if="recordarme" :size="14" stroke-width="3" />
                  </span>
                </div>
                <span class="login__checkbox-text">{{ t('auth.rememberMe') }}</span>
              </label>
              <a href="#" class="login__link">{{ t('auth.forgotPass') }}</a>
            </div>

            <!-- Botón Login -->
            <button
              type="submit"
              class="login__submit-btn"
              :disabled="cargando"
            >
              <span v-if="!cargando">{{ t('auth.submit') }}</span>
              <IconLoader2 v-else class="login__spinner" />
            </button>
          </form>

          <Transition name="fade">
            <div v-if="error" class="login__error">
              <IconAlertCircle :size="18" />
              <span>{{ error }}</span>
            </div>
          </Transition>
        </div>
      </div>

      <!-- PANEL DERECHO: ILUSTRACIÓN (Balanceada e Inmersiva) -->
      <div class="login__panel-arte">
        <div class="login__arte-container">
          <img :src="bannerUrl" alt="" class="login__arte-bg" />
          <div class="login__arte-overlay"></div>

          <div class="login__arte-contenido">
            <p class="login__arte-overtitle">{{ t('auth.welcome') }}!</p>
            <h2 class="login__arte-titulo">
              {{ t('auth.bannerTitle') }}
            </h2>
            <div class="login__arte-divider"></div>
            <p class="login__arte-desc">
              {{ t('auth.bannerDesc') }}
            </p>
          </div>

          <!-- Indicadores en una posición fija y elegante -->
          <div class="login__indicadores">
            <span class="login__dot login__dot--active"></span>
            <span class="login__dot"></span>
            <span class="login__dot"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { 
  IconUser,
  IconLock,
  IconEye, 
  IconEyeOff, 
  IconAlertCircle,
  IconLoader2,
  IconCheck
} from '@tabler/icons-vue';
import logoUrl from '~/assets/logo.png';
import bannerUrl from '~/assets/Banner_principal_V2.svg?url';

definePageMeta({ layout: 'auth' });

const { t } = useI18n();
const credenciales = ref({ usuario: '', contrasena: '' });
const mostrarContrasena = ref(false);
const recordarme = ref(false);
const cargando = ref(false);
const error = ref('');
const campoEnfocado = ref('');
const anioActual = computed(() => new Date().getFullYear());

async function iniciarSesion() {
  error.value = '';
  if (!credenciales.value.usuario || !credenciales.value.contrasena) {
    error.value = t('auth.errorEmpty');
    return;
  }
  cargando.value = true;
  try {
    await new Promise(r => setTimeout(r, 1500));
    await navigateTo('/');
  } catch (e) {
    error.value = t('auth.errorInvalid');
  } finally {
    cargando.value = false;
  }
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  background-color: #ffffff;
  font-family: 'Manrope', sans-serif;
  overflow: hidden;
  transition: var(--iv-transition);
}

.login__contenedor {
  display: flex;
  width: 100%;
  height: 100vh;
}

/* ── Panel Formulario ── */
.login__panel-formulario {
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background: radial-gradient(circle at 10% 10%, rgba(0, 159, 227, 0.02) 0%, transparent 60%);
  animation: fadeInForm 1s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes fadeInForm {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.login__inner {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login__header {
  margin-bottom: 3.5rem;
}

.login__logo-wrapper {
  margin-bottom: 2.5rem;
}

.login__logo {
  height: 48px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(31%) sepia(97%) saturate(1751%) hue-rotate(180deg) brightness(96%) contrast(101%);
}

.dark-mode .login__logo {
  filter: brightness(0) invert(1);
}

.login__titulo {
  font-size: 2.75rem;
  font-weight: 900;
  letter-spacing: -2.5px;
  margin-bottom: 0.5rem;
  color: var(--iv-text-main);
  line-height: 1.1;
}

.login__subtitulo {
  color: var(--iv-text-secondary);
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.6;
}

/* ── Formulario ── */
.login__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}

.login__campo {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.login__label {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--iv-text-main);
  margin-left: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.9;
}

.login__input-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 60px;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  padding: 0 1.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #f8fafc;
}

.login__input-wrapper--focus {
  border-color: var(--iv-primary);
  background-color: #ffffff;
  box-shadow: 0 8px 20px -8px rgba(0, 159, 227, 0.12);
  transform: translateY(-1px);
}

.login__input-icon {
  color: #94a3b8;
  transition: all 0.3s ease;
}

.login__input-wrapper--focus .login__input-icon {
  color: var(--iv-primary);
  transform: scale(1.1);
}

.login__input {
  all: unset;
  flex: 1;
  font-size: 0.95rem;
  color: var(--iv-text-main);
  font-weight: 600;
}

.login__input::placeholder {
  color: #94a3b8;
  font-weight: 400;
  opacity: 0.7;
}

.login__view-toggle {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  border-radius: 50%;
  transition: all 0.2s;
}

.login__view-toggle:hover {
  color: var(--iv-primary);
  background-color: var(--iv-item-hover);
}

.login__opciones-fila {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
}

.login__checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--iv-text-secondary);
  transition: color 0.2s;
}

.login__checkbox-label:hover {
  color: var(--iv-text-main);
}

.login__checkbox-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.login__checkbox-input { 
  display: none; 
}

.login__checkbox-custom {
  width: 22px;
  height: 22px;
  border: 2px solid #cbd5e1;
  border-radius: 7px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.login__checkbox-input:checked + .login__checkbox-custom {
  background-color: var(--iv-primary);
  border-color: var(--iv-primary);
  box-shadow: 0 4px 10px rgba(0, 159, 227, 0.2);
}

.login__link {
  color: var(--iv-primary);
  font-weight: 800;
  font-size: 0.85rem;
  text-decoration: none;
  transition: opacity 0.2s;
}

.login__link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.login__submit-btn {
  height: 60px;
  background-color: var(--iv-primary);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 800;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 159, 227, 0.15);
  margin-top: 1rem;
}

.login__submit-btn:hover:not(:disabled) {
  background-color: #008cc9;
}

.login__submit-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.login__submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login__error {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.15rem;
  background-color: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 14px;
  color: #c53030;
  font-size: 0.85rem;
  font-weight: 800;
  margin-top: 1.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

/* ── Panel Ilustración ── */
.login__panel-arte {
  flex: 1.2;
  display: flex;
  padding: 1.5rem;
}

.login__arte-container {
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

.login__arte-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
  z-index: 1;
}

.login__arte-overlay {
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

.login__arte-contenido {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 600px;
  text-align: left;
  margin-bottom: 8rem;
  margin-left: 5rem;
}

.login__arte-overtitle {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  opacity: 0.8;
}

.login__arte-titulo {
  font-size: 4rem;
  font-weight: 950;
  line-height: 1;
  margin-bottom: 1.5rem;
  letter-spacing: -3px;
  text-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.login__arte-divider {
  width: 60px;
  height: 6px;
  background-color: var(--iv-primary);
  margin-bottom: 1.5rem;
  border-radius: 3px;
}

.login__arte-desc {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 450px;
  line-height: 1.6;
  font-weight: 500;
}

.login__indicadores {
  position: absolute;
  bottom: 4rem;
  right: 5rem;
  display: flex;
  gap: 0.75rem;
  z-index: 3;
}

.login__dot {
  width: 24px;
  height: 6px;
  background: rgba(255,255,255,0.3);
  border-radius: 3px;
  transition: all 0.3s;
}

.login__dot--active {
  background: white;
  width: 48px;
}

@media (max-width: 1024px) {
  .login__panel-arte { display: none; }
  .login__panel-formulario { flex: 1; padding: 2rem; }
}
</style>
