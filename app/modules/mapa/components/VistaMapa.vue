<template>
  <div class="vista-mapa">
    <!-- Panel Izquierdo -->
    <aside class="panel-lista">
      <!-- Cabecera -->
      <header class="panel-header">
        <div class="header-logo">
          <IconCar :size="20" />
        </div>
        <h2 class="header-title">innovix tracking</h2>
        <button class="btn-info">
          <IconInfoCircle :size="20" />
        </button>
      </header>

      <!-- Buscador -->
      <div class="buscador-wrap">
        <div class="buscador-input">
          <input type="text" placeholder="Buscar dispositivo..." />
          <IconSearch class="icon-search" :size="18" />
        </div>
      </div>

      <!-- Filtros -->
      <div class="filtros-wrap">
        <div class="filtros-acciones">
          <div class="filtro-campo">
            <span class="filtro-label">Estado:</span>
            <button class="filtro-select">
              Activos <IconChevronDown :size="14" />
            </button>
          </div>
          <div class="filtro-campo">
            <span class="filtro-label">Orden:</span>
            <button class="filtro-select">
              Cercanía <IconChevronDown :size="14" />
            </button>
          </div>
        </div>
        <button class="btn-filtros">
          <IconFilter :size="16" /> Filtros
        </button>
      </div>

      <!-- Lista de Dispositivos -->
      <div class="lista-items">
        <button
          v-for="disp in dispositivos"
          :key="disp.id"
          class="item-dispositivo"
          :class="{ 'item-activo': seleccionado === disp.id }"
          @click="seleccionar(disp.id)"
        >
          <!-- Indicador activo lateral (Igual al Sidebar) -->
          <span class="item-indicador"></span>

          <!-- Ícono (Avatar) -->
          <div class="item-avatar" :class="`avatar-${disp.estadoClase}`">
            <component :is="disp.icono" :size="22" />
          </div>

          <!-- Info Principal -->
          <div class="item-info">
            <h3 class="item-nombre">{{ disp.nombre }}</h3>
          </div>

          <!-- Estado / Status -->
          <div class="item-estado">
            <IconCube class="estado-icon" :size="16" />
            <component :is="disp.estadoIcono" class="estado-indicador" :class="`text-${disp.estadoClase}`" :size="16" />
          </div>
        </button>
      </div>
    </aside>

    <main class="panel-mapa">
      <div class="mapa-simulado">
        <div class="map-grid"></div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IconSearch,
  IconChevronDown,
  IconFilter,
  IconCar,
  IconTruck,
  IconCube,
  IconWifi,
  IconZzz,
  IconWifiOff,
  IconInfoCircle
} from '@tabler/icons-vue';

const seleccionado = ref(1);

const dispositivos = ref([
  {
    id: 1,
    nombre: 'GL800',
    detalles: '0.5 mi • En movimiento',
    estadoTexto: 'Movimiento',
    velocidad: '45 km/h',
    fecha: '14 sept 6:00pm',
    estadoClase: 'online',
    estadoIcono: IconWifi,
    icono: IconTruck,
    pos: { x: 25, y: 32 }
  },
  {
    id: 2,
    nombre: 'W07',
    detalles: '0.7 mi • Detenido',
    estadoTexto: 'Detenido',
    velocidad: '0 km/h',
    fecha: '14 sept 5:30pm',
    estadoClase: 'idle',
    estadoIcono: IconZzz,
    icono: IconTruck,
    pos: { x: 65, y: 15 }
  },
  {
    id: 3,
    nombre: 'W07 - innovix pruebas',
    detalles: '0.2 mi • Desconectado',
    estadoTexto: 'Sin señal',
    velocidad: '0 km/h',
    fecha: '12 sept 11:00am',
    estadoClase: 'offline',
    estadoIcono: IconWifiOff,
    icono: IconTruck,
    pos: { x: 40, y: 65 }
  },
  {
    id: 4,
    nombre: 'G107',
    detalles: '2.1 mi • En movimiento',
    estadoTexto: 'Movimiento',
    velocidad: '62 km/h',
    fecha: '14 sept 6:15pm',
    estadoClase: 'online',
    estadoIcono: IconWifi,
    icono: IconTruck,
    pos: { x: 75, y: 55 }
  }
]);

const seleccionar = (id: number) => {
  seleccionado.value = id;
};
</script>

<style scoped>
/* ── Layout Global ── */
.vista-mapa {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: var(--iv-card-bg);
  transition: all 0.3s ease;
}

/* Herencia de Variables Globales del Sistema */
.vista-mapa {
  --map-panel-bg: var(--iv-sidebar-bg);
  --map-map-bg: var(--iv-surface);
  --map-text-main: var(--iv-text-main);
  --map-text-muted: var(--iv-text-muted);
  --map-border: var(--iv-border);
  --map-hover: var(--iv-item-hover);
  --map-active: rgba(0, 159, 227, 0.08);
}

/* ── Panel Izquierdo ── */
.panel-lista {
  width: 360px;
  background-color: var(--map-panel-bg);
  border-right: 1px solid var(--map-border);
  display: flex;
  flex-direction: column;
  color: var(--map-text-main);
  z-index: 10;
  transition: background-color 0.3s ease;
}

.panel-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 1.25rem 1rem;
  gap: 1rem;
}

.btn-atras, .btn-info {
  all: unset;
  cursor: pointer;
  color: var(--map-text-main);
  display: flex;
}

.header-logo {
  width: 36px;
  height: 36px;
  background-color: var(--iv-text-main);
  color: var(--iv-card-bg);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .header-logo {
  background-color: var(--iv-primary); /* Mejor consistencia en logo */
  color: #fff;
}

.header-title {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}

/* Buscador */
.buscador-wrap {
  padding: 0 1.25rem;
  margin-bottom: 1rem;
}

.buscador-input {
  position: relative;
  display: flex;
  align-items: center;
}

.buscador-input input {
  width: 100%;
  padding: 0.85rem 1rem;
  padding-right: 2.5rem;
  border-radius: 99px;
  border: 1px solid var(--map-border);
  background-color: transparent;
  color: var(--map-text-main);
  font-family: inherit;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.buscador-input input:focus {
  border-color: var(--iv-primary);
}

.icon-search {
  position: absolute;
  right: 1.2rem;
  color: var(--map-text-muted);
}

/* Filtros */
.filtros-wrap {
  padding: 0 1.25rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid var(--map-border);
}

.filtros-acciones {
  display: flex;
  gap: 1.5rem;
}

.filtro-campo {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filtro-label {
  font-size: 0.75rem;
  color: var(--map-text-muted);
}

.filtro-select {
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-filtros {
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid var(--map-border);
  padding: 0.4rem 0.8rem;
  border-radius: 99px;
  cursor: pointer;
}

/* Lista Consistente con Sidebar */
.lista-items {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  scrollbar-width: none;
}
.lista-items::-webkit-scrollbar { display: none; }

.item-dispositivo {
  all: unset;
  display: flex;
  align-items: center;
  padding: 0.7rem 0.75rem;
  margin: 0 1rem;
  border-radius: 10px;
  cursor: pointer;
  width: calc(100% - 2rem);
  box-sizing: border-box;
  transition: background-color 0.2s ease, color 0.2s ease;
  position: relative;
  overflow: hidden;
}

.item-dispositivo:hover {
  background-color: var(--map-hover);
}

.item-activo {
  background-color: var(--map-active);
}

/* Indicador de barra lateral izquierda (Igual a Sidebar) */
.item-indicador {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 3px;
  height: 60%;
  border-radius: 0 3px 3px 0;
  background-color: var(--iv-primary);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.item-activo .item-indicador {
  transform: translateY(-50%) scaleY(1);
}

.item-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
}

.avatar-online { background-color: #d1fae5; color: #059669; }
.avatar-idle { background-color: #fee2e2; color: #e11d48; }
.avatar-offline { background-color: #e2e8f0; color: #475569; }

.dark-mode .avatar-online { background-color: rgba(16, 185, 129, 0.15); }
.dark-mode .avatar-idle { background-color: rgba(244, 63, 94, 0.15); }
.dark-mode .avatar-offline { background-color: rgba(148, 163, 184, 0.15); }

.item-info {
  flex: 1;
  overflow: hidden;
}

.item-nombre {
  margin: 0 0 0.25rem 0;
  font-size: 0.95rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-detalles {
  margin: 0;
  font-size: 0.75rem;
  color: var(--map-text-muted);
  font-weight: 500;
}

.item-estado {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--map-text-muted);
}

.text-online { color: #10b981; }
.text-idle { color: #f43f5e; }
.text-offline { color: #94a3b8; }

/* ── Panel Mapa ── */
.panel-mapa {
  flex: 1;
  background-color: var(--map-map-bg);
  position: relative;
  overflow: hidden;
}

.mapa-simulado {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(100,100,100,0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(100,100,100,0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

.map-routes {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.route-line {
  fill: none;
  stroke: #10b981;
  stroke-width: 0.8;
  stroke-dasharray: 2;
  animation: dash 20s linear infinite;
  opacity: 0.7;
}

@keyframes dash {
  to { stroke-dashoffset: -100; }
}

/* Map Pins */
.map-pin-wrap {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 20;
}

.map-pin {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--map-panel-bg);
  color: var(--map-text-main);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border: 2px solid transparent;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.map-pin:hover {
  transform: scale(1.1);
}

.map-pin.pin-activo {
  border-color: var(--iv-primary);
  transform: scale(1.15);
  box-shadow: 0 6px 16px rgba(0, 159, 227, 0.3);
}

.pin-online { color: #10b981; }
.pin-idle { color: #f43f5e; }
.pin-offline { color: #94a3b8; }

.map-pin-label {
  margin-top: 0.4rem;
  background-color: var(--map-panel-bg);
  border: 1px solid var(--map-border);
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--map-text-main);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

/* Popup / Card Float */
.map-popup {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 1.5rem;
  width: 320px;
  background-color: var(--map-panel-bg);
  border-radius: 1.5rem;
  padding: 1.25rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.25);
  border: 1px solid var(--map-border);
  cursor: default;
  z-index: 30;
  color: var(--map-text-main);
}

.animate-in {
  animation: popup-enter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes popup-enter {
  from { opacity: 0; transform: translate(-50%, 10px) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, 0) scale(1); }
}

.popup-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.popup-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-title h3 {
  margin: 0 0 0.2rem 0;
  font-size: 1.1rem;
}

.popup-title p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--iv-primary);
  font-weight: 600;
}

.popup-stats {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--map-border);
  border-bottom: 1px solid var(--map-border);
  margin-bottom: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--map-text-main);
}

.popup-desc {
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--map-text-muted);
  margin-bottom: 1.25rem;
}

.popup-btn {
  all: unset;
  background-color: var(--map-active);
  color: var(--map-text-main);
  width: 100%;
  padding: 0.85rem;
  text-align: center;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;
}

.popup-btn:hover {
  background-color: var(--map-hover);
}
</style>
