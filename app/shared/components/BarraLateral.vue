<template>
  <aside class="sidebar" :class="{ 'sidebar--colapsado': navStore.estaColapsado }">

    <SidebarCollapseBtn
      :is-collapsed="navStore.estaColapsado"
      @toggle="navStore.alternarColapso"
    />

    <header class="sidebar__marca">
      <img :src="logoUrl" alt="Innovix" class="marca__logo" />
    </header>

    <div class="sidebar__scroll">
      <nav class="sidebar__nav">
        <div
          v-for="seccion in navStore.sections"
          :key="seccion.id"
          class="nav__grupo"
        >
          <div class="nav__divisor-grupo"></div>
          <span class="nav__titulo-grupo">{{ $t(`sidebar.${seccion.id}`) }}</span>

          <div class="nav__items">
            <SidebarNavItem
              v-for="item in seccion.items"
              :key="item.id"
              :item="item"
              :is-active="navStore.activeItemId === item.id"
              :is-collapsed="navStore.estaColapsado"
              :label="$t(`sidebar.${item.id}`)"
              :icon-name="item.icon"
              :badge="item.badge"
              :badge-type="item.badgeType"
              @click="navStore.setActive(item.id)"
            />
          </div>
        </div>
      </nav>
    </div>

    <!-- Footer -->
    <footer class="sidebar__footer">

      <!-- Toggle de tema -->
      <ThemeTogglePill :is-collapsed="navStore.estaColapsado" />

      <!-- Selector de idioma -->
      <SidebarLocaleSwitcher :is-collapsed="navStore.estaColapsado" />

    </footer>

  </aside>
</template>

<script setup lang="ts">
import { useNavigationStore } from '~/core/navigation/application/useNavigation';
import logoUrl from '~/assets/logo.png';

import SidebarCollapseBtn from './ui/SidebarCollapseBtn.vue';
import SidebarNavItem from './ui/SidebarNavItem.vue';
import ThemeTogglePill from './ui/ThemeTogglePill.vue';
import SidebarLocaleSwitcher from './ui/SidebarLocaleSwitcher.vue';

const navStore = useNavigationStore();
</script>

<style scoped>
/* ── Contenedor principal ── */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background-color: var(--iv-sidebar-bg);
  display: flex;
  flex-direction: column;
  padding: 1.75rem 0.85rem 1.25rem;
  box-sizing: border-box;
  z-index: 1000;
  font-family: 'Manrope', sans-serif;
  border-right: 1px solid var(--iv-border);
  transition:
    width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
}

.sidebar--colapsado {
  width: 72px;
  padding: 1.75rem 0.65rem 1.25rem;
}

/* ── Marca / Logo ── */
.sidebar__marca {
  padding: 0 0.15rem 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.marca__logo {
  height: 38px;
  width: auto;
  min-width: 0;
  max-width: 140px;
  object-fit: contain;
  transition:
    filter 0.3s ease,
    max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(0) saturate(100%) invert(31%) sepia(97%) saturate(1751%) hue-rotate(180deg) brightness(96%) contrast(101%);
}

.dark-mode .marca__logo {
  filter: brightness(0) invert(1);
}

.sidebar--colapsado .marca__logo {
  max-width: 32px;
}

/* ── Scroll ── */
.sidebar__scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
}
.sidebar__scroll::-webkit-scrollbar { display: none; }

/* ── Nav ── */
.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Grupo ── */
.nav__grupo {
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
}

.nav__grupo:first-child {
  padding-top: 0;
}

/* Divisor de grupo visible solo en modo colapsado */
.nav__divisor-grupo {
  display: none;
  height: 1px;
  background-color: var(--iv-border);
  margin: 0 0.5rem 0.75rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar--colapsado .nav__divisor-grupo {
  display: block;
  opacity: 1;
}

.nav__grupo:first-child .nav__divisor-grupo {
  display: none !important;
}

.nav__titulo-grupo {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--iv-text-muted);
  letter-spacing: 0.1em;
  padding-left: 0.75rem;
  margin-bottom: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  opacity: 1;
  max-height: 2rem;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar--colapsado .nav__titulo-grupo {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
  pointer-events: none;
}

.nav__items {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

/* ── Footer ── */
.sidebar__footer {
  padding-top: 1rem;
  margin-top: 0.25rem;
  border-top: 1px solid var(--iv-border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
}
</style>


