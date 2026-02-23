<template>
  <form class="otp-form" @submit.prevent="$emit('verificar')">
    <p class="otp-form__mensaje">
      {{ $t('auth.otpMessage') }}
    </p>

    <div class="otp-form__inputs">
      <input
        v-for="(digito, index) in modelValue"
        :key="index"
        ref="otpInputs"
        :value="modelValue[index]"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="1"
        class="otp-form__input"
        @input="manejarInput(index, $event)"
        @keydown="manejarKeydown(index, $event)"
        @paste="manejarPaste($event)"
      />
    </div>

    <div class="otp-form__reenvio">
      <p v-if="puedeReenviar" class="otp-form__reenvio-texto">
        {{ $t('auth.otpResendText') }}
        <button type="button" class="otp-form__reenvio-btn" @click="$emit('reenviar')">
          {{ $t('auth.otpResendAction') }}
        </button>
      </p>
      <p v-else class="otp-form__reenvio-texto otp-form__reenvio-texto--espera">
        {{ $t('auth.otpWait') }} <span>{{ contador }}s</span>
      </p>
    </div>

    <button
      type="submit"
      class="otp-form__submit-btn"
      :disabled="cargando || modelValue.join('').length < 4"
      :data-cargando="cargando"
    >
      <span v-if="!cargando">{{ $t('auth.otpVerify') }}</span>
      <IconLoader2 v-else class="otp-form__spinner" />
    </button>

    <button type="button" class="otp-form__back-btn" @click="$emit('volver')">
      {{ $t('auth.otpBack') }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IconLoader2 } from '@tabler/icons-vue';

const props = defineProps<{
  modelValue: string[];
  cargando: boolean;
  puedeReenviar: boolean;
  contador: number;
}>();

const emit = defineEmits(['update:modelValue', 'verificar', 'reenviar', 'volver']);

const otpInputs = ref<HTMLInputElement[]>([]);

function manejarInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/\D/g, ''); // Limpiar cualquier carácter no numérico
  target.value = value; // Forzar actualización visual si se escribió una letra

  const nuevoOtp = [...props.modelValue];
  nuevoOtp[index] = value;
  emit('update:modelValue', nuevoOtp);

  if (value && index < 3) {
    otpInputs.value[index + 1]?.focus();
  }
}

function manejarKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !props.modelValue[index] && index > 0) {
    otpInputs.value[index - 1]?.focus();
  }
}

function manejarPaste(event: ClipboardEvent) {
  event.preventDefault();
  const text = event.clipboardData?.getData('text');
  if (text) {
    const digitos = text.replace(/\D/g, '').slice(0, 4).split('');
    const nuevoOtp = [...props.modelValue];
    digitos.forEach((digito, i) => {
      nuevoOtp[i] = digito;
    });
    emit('update:modelValue', nuevoOtp);
    const nextFocusIndex = Math.min(digitos.length, 3);
    otpInputs.value[nextFocusIndex]?.focus();
  }
}

onMounted(() => {
  otpInputs.value[0]?.focus();
});
</script>

<style scoped>
.otp-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.otp-form__mensaje {
  font-size: 0.95rem;
  color: var(--iv-text-secondary);
  line-height: 1.5;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 100%;
}

.otp-form__inputs {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.otp-form__input {
  width: 45px;
  height: 60px;
  border: none;
  border-bottom: 2px solid var(--iv-border);
  font-size: 2.25rem;
  font-weight: 800;
  text-align: center;
  color: var(--iv-text-main);
  background-color: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  border-radius: 0;
  padding-bottom: 5px;
}

.otp-form__input:focus {
  border-bottom-color: var(--iv-primary);
  transform: translateY(-4px);
  color: var(--iv-primary);
}

.otp-form__reenvio {
  text-align: center;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

.otp-form__reenvio-texto {
  font-size: 0.85rem;
  color: var(--iv-text-secondary);
  font-weight: 500;
}

.otp-form__reenvio-btn {
  background: none;
  border: none;
  color: var(--iv-primary);
  font-weight: 800;
  cursor: pointer;
  padding: 0 0.25rem;
  transition: all 0.2s;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.otp-form__reenvio-btn:hover {
  color: #008cc9;
  text-decoration-color: transparent;
}

.otp-form__reenvio-texto--espera span {
  color: var(--iv-primary);
  font-weight: 800;
}

.otp-form__submit-btn {
  height: 60px;
  background-color: var(--iv-primary);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 800;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 159, 227, 0.15);
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.otp-form__submit-btn:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

.otp-form__submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.otp-form__submit-btn:disabled[data-cargando="true"] {
  cursor: wait;
}

.otp-form__submit-btn:hover:not(:disabled) {
  background-color: #008cc9;
  box-shadow: 0 6px 16px rgba(0, 159, 227, 0.25);
  transform: translateY(-2px);
}

.otp-form__back-btn {
  background: none;
  border: none;
  color: var(--iv-text-secondary);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

.otp-form__spinner {
  animation: spinner-spin 0.8s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
}

@keyframes spinner-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {

  /* --- Estilos especiales para el contenedor centrado en móvil --- */
  :global(.login__panel-formulario--centrado) .otp-form {
    text-align: center;
  }
}
</style>


