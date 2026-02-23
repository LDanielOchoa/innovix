<template>
  <div class="login" :class="{ 'login--otp': paso === 'otp' }">
    <div class="login__contenedor">
      <div 
        class="login__panel-formulario"
        :class="{ 'login__panel-formulario--centrado': paso === 'otp' }"
      >
        <div class="login__inner">
          <AuthHeader :paso="paso" />

          <div class="login__tarjeta">
            <Transition name="fade" mode="out-in">
              <LoginForm 
                v-if="paso === 'login'" 
                v-model="credenciales" 
                :cargando="cargando" 
                @submit="iniciarSesion" 
              />
              
              <OtpForm 
                v-else 
                v-model="otp" 
                :cargando="cargando" 
                :puede-reenviar="puedeReenviar" 
                :contador="contadorReenvio" 
                @verificar="verificarOtp" 
                @reenviar="reenviarCodigo" 
                @volver="paso = 'login'" 
              />
            </Transition>

            <Transition name="error-fade">
              <p v-if="error" class="login__error">
                <IconAlertCircle :size="16" />
                {{ error }}
              </p>
            </Transition>
            
            <footer class="login__footer-mobile">
              <p>&copy; {{ anioActual }} Innovix. {{ $t('auth.rights') }}</p>
              <div class="login__footer-links">
                <span>{{ $t('auth.support') }}</span>
                <span class="login__footer-dot"></span>
                <span>{{ $t('auth.privacy') }}</span>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <AuthArtPanel :paso="paso" />
      <AuthMobileDecor />
      
      <footer class="login__footer-desktop">
        <p>&copy; {{ anioActual }} Innovix. {{ $t('auth.rights') }}</p>
        <div class="login__footer-desktop-links">
          <span>{{ $t('auth.support') }}</span>
          <span class="login__footer-desktop-dot"></span>
          <span>{{ $t('auth.privacy') }}</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { IconAlertCircle } from '@tabler/icons-vue';

// Componentes del módulo Auth
import AuthHeader from '~/modules/auth/components/AuthHeader.vue';
import LoginForm from '~/modules/auth/components/LoginForm.vue';
import OtpForm from '~/modules/auth/components/OtpForm.vue';
import AuthArtPanel from '~/modules/auth/components/AuthArtPanel.vue';
import AuthMobileDecor from '~/modules/auth/components/AuthMobileDecor.vue';

definePageMeta({ layout: 'auth' });

const { t } = useI18n();
const credenciales = ref({ usuario: '', contrasena: '' });
const cargando = ref(false);
const error = ref('');
const anioActual = computed(() => new Date().getFullYear());
const localePath = useLocalePath();

const paso = ref<'login' | 'otp'>('login');
const otp = ref(['', '', '', '']);

// Lógica de Reenvío de OTP
const contadorReenvio = ref(0);
const puedeReenviar = computed(() => contadorReenvio.value === 0);
let intervaloReenvio: any = null;

function iniciarContador() {
  if (intervaloReenvio) clearInterval(intervaloReenvio);
  contadorReenvio.value = 60;
  intervaloReenvio = setInterval(() => {
    if (contadorReenvio.value > 0) {
      contadorReenvio.value--;
    } else {
      clearInterval(intervaloReenvio);
      intervaloReenvio = null;
    }
  }, 1000);
}

async function iniciarSesion() {
  error.value = '';
  if (!credenciales.value.usuario || !credenciales.value.contrasena) {
    error.value = t('auth.errorEmpty');
    return;
  }
  cargando.value = true;
  try {
    await new Promise(r => setTimeout(r, 1000));
    paso.value = 'otp';
    iniciarContador();
  } catch (e) {
    error.value = t('auth.errorInvalid');
  } finally {
    cargando.value = false;
  }
}

async function verificarOtp() {
  error.value = '';
  const codigo = otp.value.join('');
  if (codigo.length < 4) {
    error.value = 'Por favor ingresa el código completo';
    return;
  }
  
  cargando.value = true;
  try {
    await new Promise(r => setTimeout(r, 1500));
    await navigateTo(localePath('/'));
  } catch (e) {
    error.value = 'Código OTP inválido';
  } finally {
    cargando.value = false;
  }
}

async function reenviarCodigo() {
  if (!puedeReenviar.value) return;
  
  error.value = '';
  cargando.value = true;
  try {
    await new Promise(r => setTimeout(r, 1000));
    iniciarContador();
    otp.value = ['', '', '', ''];
  } catch (e) {
    error.value = 'Error al reenviar el código. Intenta nuevamente.';
  } finally {
    cargando.value = false;
  }
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  background-color: var(--iv-card-bg);
  font-family: 'Manrope', sans-serif;
  overflow: hidden;
  position: relative;
  transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.login::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--iv-card-bg);
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  pointer-events: none;
}

.login.login--otp::before {
  opacity: 1;
}

.login__contenedor {
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
}

.login__panel-formulario {
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background: radial-gradient(circle at 10% 10%, rgba(0, 159, 227, 0.02) 0%, transparent 60%);
  animation: fadeInForm 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: flex 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.login__panel-formulario--centrado {
  flex: 1;
}

@keyframes fadeInForm {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.login__inner {
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
}

.login__tarjeta {
  position: relative;
}

.login__error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 600;
  justify-content: center;
  position: absolute;
  bottom: -3.5rem;
  left: 0;
  right: 0;
}

.login__footer-desktop {
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  color: #94a3b8;
  font-size: 0.8rem;
  z-index: 10;
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.login.login--otp .login__footer-desktop {
  width: 100%;
}

.login__footer-desktop-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
}

.login__footer-desktop-dot {
  width: 3px;
  height: 3px;
  background-color: #cbd5e1;
  border-radius: 50%;
  display: inline-block;
}

.login__footer-mobile {
  display: none;
}

@media (max-width: 768px) {
  .login {
    background-color: var(--iv-card-bg);
    position: relative;
    height: 100dvh;
    overflow: hidden;
  }

  .login__footer-desktop {
    display: none;
  }

  .login__contenedor {
    flex-direction: column;
    height: 100%;
    display: flex;
    background: none;
  }

  .login__panel-formulario {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    background: none;
    animation: none;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .login__inner {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 100%;
    flex: 1 0 auto;
    min-height: 100%;
    box-sizing: border-box;
    padding-top: 3rem;
  }

  .login__tarjeta {
    background-color: var(--iv-card-bg);
    border-radius: 0;
    padding: 0.5rem 1.75rem 1.5rem;
    margin-top: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: none;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1 0 auto;
    box-sizing: border-box;
  }

  .login__footer-mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    color: var(--iv-text-muted, #64748b);
    font-size: 0.75rem;
    text-align: center;
    margin-top: auto;
    padding-top: 2rem;
  }

  .login__footer-links {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 700;
  }

  .login__footer-dot {
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 50%;
    display: inline-block;
  }

  .login__error {
    position: relative;
    bottom: auto;
    margin-top: 1rem;
    margin-bottom: -1rem;
    z-index: 2;
  }

  .login.login--otp :deep(.auth-decor__mobile) {
    opacity: 0 !important;
  }

  .login__panel-formulario--centrado .login__tarjeta {
    border-radius: 0;
    flex: 1;
    justify-content: center;
    padding: 2rem 1.75rem;
    margin-top: 0;
    box-shadow: none;
    min-height: auto;
  }
}

/* Transiciones */
.fade-enter-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.error-fade-enter-active {
  transition: opacity 0.3s ease;
}

.error-fade-leave-active {
  transition: opacity 0.2s ease;
}

.error-fade-enter-from,
.error-fade-leave-to {
  opacity: 0;
}
</style>
