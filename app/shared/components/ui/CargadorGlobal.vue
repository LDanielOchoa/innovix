<template>
  <div class="cargador-container">
    <Transition name="fade">
      <div v-if="cargando" class="pantalla-carga">
      <div class="contenedor-cargador">
        <svg viewBox="0 0 160 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineSuelo" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#009fe3" stop-opacity="0" />
              <stop offset="25%" stop-color="#009fe3" stop-opacity="1" />
              <stop offset="75%" stop-color="#009fe3" stop-opacity="1" />
              <stop offset="100%" stop-color="#009fe3" stop-opacity="0" />
            </linearGradient>
          </defs>

          <!-- VIENTO SUPER FLUIDO -->
          <g opacity="0.3">
            <rect y="44" width="30" height="1.5" rx="0.75" fill="#009fe3">
              <animate attributeName="x" values="180; -40" dur="0.9s" repeatCount="indefinite" />
            </rect>
            <rect y="58" width="12" height="1.5" rx="0.75" fill="#009fe3">
              <animate attributeName="x" values="170; -30" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect y="70" width="45" height="1.5" rx="0.75" fill="#009fe3">
              <animate attributeName="x" values="220; -60" dur="0.7s" repeatCount="indefinite" />
            </rect>
          </g>

          <!-- LÍNEA DE SUELO / CARRETERA -->
          <rect x="20" y="75" width="120" height="1.5" fill="url(#lineSuelo)" rx="0.5" />
          
          <!-- PEQUEÑAS MARCAS EN EL SUELO -->
          <rect y="74.5" width="6" height="1.5" rx="0.75" fill="#009fe3" opacity="0.8">
            <animate attributeName="x" values="120; 30" dur="0.45s" repeatCount="indefinite" />
          </rect>

          <!-- SOMBRA DEL CAMIÓN -->
          <ellipse cx="80" cy="74.5" rx="35" ry="1.5" fill="#009fe3" opacity="0.1" />

          <!-- TEXTO DE CARGANDO -->
          <text x="80" y="93" font-family="'Manrope', system-ui, -apple-system, sans-serif" font-size="9.5" font-weight="800" fill="#009fe3" text-anchor="middle" letter-spacing="2.5" opacity="0.9">
            {{ $t('common.loading') }}<tspan><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />.</tspan><tspan><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s"/>.</tspan><tspan><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="1s"/>.</tspan>
          </text>

          <!-- GRUPO PRINCIPAL DEL CAMIÓN -->
          <g transform="translate(42, 26.5)">
            <g>
              <animateTransform 
                attributeName="transform" 
                type="translate" 
                values="0,0.5; 0,-1.5; 0,0.5" 
                dur="0.45s" 
                repeatCount="indefinite" 
                keyTimes="0; 0.5; 1" 
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" 
                calcMode="spline" 
              />
              <path d="M 0 40 L 0 12 A 6 6 0 0 1 6 6 L 42 6 A 4 4 0 0 1 46 10 L 46 43 L 24 43 A 8 8 0 0 0 8 43 L 4 43 A 4 4 0 0 1 0 39 Z" fill="#009fe3" />
              <rect x="7" y="24" width="20" height="2" fill="var(--iv-bg)" rx="1" />
              <rect x="7" y="30" width="14" height="2" fill="var(--iv-bg)" rx="1" />
              <rect x="44" y="14" width="6" height="2" fill="#009fe3" opacity="0.6" rx="1" />
              <path d="M 48 20 A 4 4 0 0 1 52 16 L 58 16 A 5 5 0 0 1 62.5 18 L 71.5 28 A 5 5 0 0 1 73.5 31.5 L 73.5 40 A 3 3 0 0 1 70.5 43 L 68 43 A 8 8 0 0 0 52 43 L 48 43 Z" fill="#009fe3" />
              <path d="M 53.5 19.5 L 57.5 19.5 A 2 2 0 0 1 59 20 L 65.5 27 A 3 3 0 0 1 64.5 29 L 53.5 29 A 2.5 2.5 0 0 1 51 26.5 L 51 22 A 2.5 2.5 0 0 1 53.5 19.5 Z" fill="var(--iv-bg)" />
            </g>
            <g transform="translate(16, 43)">
              <circle r="4.5" fill="var(--iv-bg)" stroke="#009fe3" stroke-width="2.5" />
              <g>
                <line x1="0" y1="0" x2="0" y2="-4" stroke="#009fe3" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="0" y1="0" x2="-3.46" y2="2" stroke="#009fe3" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="0" y1="0" x2="3.46" y2="2" stroke="#009fe3" stroke-width="1.2" stroke-linecap="round"/>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" />
              </g>
              <circle r="1" fill="#009fe3" />
            </g>
            <g transform="translate(60, 43)">
              <circle r="4.5" fill="var(--iv-bg)" stroke="#009fe3" stroke-width="2.5" />
              <g>
                <line x1="0" y1="0" x2="0" y2="-4" stroke="#009fe3" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="0" y1="0" x2="-3.46" y2="2" stroke="#009fe3" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="0" y1="0" x2="3.46" y2="2" stroke="#009fe3" stroke-width="1.2" stroke-linecap="round"/>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" />
              </g>
              <circle r="1" fill="#009fe3" />
            </g>
          </g>
        </svg>
      </div>
    </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const cargando = ref(true);
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    cargando.value = false;
  }, 600);

  router.beforeEach(() => {
    cargando.value = true;
  });

  router.afterEach(() => {
    setTimeout(() => {
      cargando.value = false;
    }, 300);
  });
});
</script>

<style scoped>
.pantalla-carga {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--iv-bg);
  z-index: 9999;
}

.contenedor-cargador {
  width: 240px;
  filter: drop-shadow(0px 10px 25px rgba(0, 159, 227, 0.15));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.33, 1, 0.68, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .contenedor-cargador {
    width: 180px;
  }
}
</style>
