<template>
  <form class="login-form" @submit.prevent="$emit('submit')">
    <div class="login-form__campo">
      <label class="login-form__label" for="usuario">{{ $t('auth.userLabel') }}</label>
      <div class="login-form__input-wrapper" :class="{ 'login-form__input-wrapper--focus': campoEnfocado === 'usuario' }">
        <IconUser class="login-form__input-icon" :size="20" />
        <input
          id="usuario"
          v-model="modelValue.usuario"
          type="text"
          :placeholder="$t('auth.userPlaceholder')"
          class="login-form__input"
          @focus="campoEnfocado = 'usuario'"
          @blur="campoEnfocado = ''"
        />
      </div>
    </div>

    <div class="login-form__campo">
      <label class="login-form__label" for="contrasena">{{ $t('auth.passLabel') }}</label>
      <div class="login-form__input-wrapper" :class="{ 'login-form__input-wrapper--focus': campoEnfocado === 'contrasena' }">
        <IconLock class="login-form__input-icon" :size="20" />
        <input
          id="contrasena"
          v-model="modelValue.contrasena"
          :type="mostrarContrasena ? 'text' : 'password'"
          :placeholder="$t('auth.passPlaceholder')"
          class="login-form__input"
          @focus="campoEnfocado = 'contrasena'"
          @blur="campoEnfocado = ''"
        />
        <button
          type="button"
          class="login-form__view-toggle"
          @click="mostrarContrasena = !mostrarContrasena"
        >
          <component :is="mostrarContrasena ? IconEyeOff : IconEye" :size="18" />
        </button>
      </div>
    </div>

    <button
      type="submit"
      class="login-form__submit-btn"
      :disabled="cargando || !modelValue.usuario || !modelValue.contrasena"
      :data-cargando="cargando"
    >
      <span v-if="!cargando">{{ $t('auth.submit') }}</span>
      <IconLoader2 v-else class="login-form__spinner" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IconUser, 
  IconLock, 
  IconEye, 
  IconEyeOff, 
  IconLoader2 
} from '@tabler/icons-vue';

defineProps<{
  modelValue: { usuario: string; contrasena: string };
  cargando: boolean;
}>();

defineEmits(['update:modelValue', 'submit']);

const campoEnfocado = ref('');
const mostrarContrasena = ref(false);
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: left;
  width: 100%;
}

.login-form__campo {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.login-form__label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
  margin-left: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.login-form__input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 52px;
  border: 1px solid transparent;
  border-radius: 30px;
  padding: 0 1.5rem;
  transition: all 0.2s ease;
  background-color: #f1f5f9;
}

.login-form__input-wrapper--focus {
  background-color: #f1f5f9;
  border-color: transparent;
}

.login-form__input-icon {
  color: #94a3b8;
}

.login-form__input {
  all: unset;
  flex: 1;
  font-size: 0.95rem;
  color: #1e293b;
  font-weight: 500;
}

.login-form__input::placeholder {
  color: #cbd5e1;
  font-weight: 400;
}

.login-form__view-toggle {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.4rem;
  display: flex;
  border-radius: 50%;
  transition: all 0.2s;
  opacity: 0.6;
}

.login-form__submit-btn {
  height: 52px;
  background-color: #00ADF7;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form__submit-btn:hover:not(:disabled) {
  background-color: #0096d6;
  transform: translateY(-1px);
}

.login-form__submit-btn:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

.login-form__submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-form__submit-btn:disabled[data-cargando="true"] {
  cursor: wait;
}

.login-form__spinner {
  animation: spinner-spin 0.8s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
}

@keyframes spinner-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


</style>
