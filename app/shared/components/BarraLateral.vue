<template>
  <aside class="sidebar-vuesax">
    <!-- Branding -->
    <header class="brand-section">
      <div class="logo-wrapper">
        <img :src="logoUrl" :alt="$t('sidebar.dashboard')" class="brand-logo" />
      </div>
    </header>

    <!-- Navigation Scroll -->
    <div class="scroller-area">
      <nav class="nav-container">
        <div v-for="section in navStore.sections" :key="section.id" class="nav-group">
          <span class="group-title">{{ $t(`sidebar.${section.id}`) }}</span>
          
          <div class="items-stack">
            <button 
              v-for="item in section.items" 
              :key="item.id"
              class="nav-item-btn"
              :class="{ 'is-active': navStore.activeItemId === item.id }"
              @click="navStore.setActive(item.id)"
            >
              <div class="icon-holder">
                <component :is="getIcon(item.icon)" :size="20" />
              </div>
              <span class="item-label">{{ $t(`sidebar.${item.id}`) }}</span>
              
              <div v-if="item.badge" class="item-badge" :class="item.badgeType">
                {{ item.badge }}
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <!-- Status Indicator & Theme Toggle -->
    <footer class="sidebar-status">
      <div class="footer-actions">
        <div class="status-pill">
          <div class="status-indicator"></div>
          <span class="status-text">{{ $t('sidebar.activeSystem') }}</span>
        </div>
        
        <div class="locale-switcher">
          <button 
            @click="localeStore.setLocale('es')" 
            :class="{ active: localeStore.currentLocale === 'es' }"
            title="Español"
          >
            ES
          </button>
          <button 
            @click="localeStore.setLocale('en')" 
            :class="{ active: localeStore.currentLocale === 'en' }"
            title="English"
          >
            EN
          </button>
        </div>
      </div>

      <button 
        class="theme-toggle" 
        @click="themeStore.toggleTheme"
        :title="themeStore.isDarkMode ? $t('theme.switchToLight') : $t('theme.switchToDark')"
      >
        <component :is="themeStore.isDarkMode ? IconSun : IconMoon" :size="18" />
      </button>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import { useNavigationStore } from '~/core/navigation/application/useNavigation';
import { useThemeStore } from '~/core/theme/application/useTheme';
import { useLocaleStore } from '~/core/i18n/application/useLocale';
import { 
  IconLayoutDashboard,
  IconActivity,
  IconMap2,
  IconShieldCheck,
  IconSettings,
  IconSun,
  IconMoon
} from '@tabler/icons-vue';
import logoUrl from '~/assets/logo.png';

const navStore = useNavigationStore();
const themeStore = useThemeStore();
const localeStore = useLocaleStore();

const iconMap: Record<string, any> = {
  IconLayoutDashboard,
  IconActivity,
  IconMap2,
  IconShieldCheck,
  IconSettings
};

const getIcon = (iconName: string) => iconMap[iconName] || IconLayoutDashboard;
</script>

<style scoped>
/* 
  Bespoke UI Design System for INNOVIX
  Philosophy: Minimalism, Depth, and Precision.
*/

.sidebar-vuesax {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background-color: var(--iv-sidebar-bg);
  display: flex;
  flex-direction: column;
  padding: 2.5rem 1.25rem;
  box-sizing: border-box;
  z-index: 1000;
  font-family: 'Manrope', sans-serif;
  border-right: 1px solid var(--iv-border);
  transition: var(--iv-transition);
}

/* Brand */
.brand-section {
  padding-bottom: 3.5rem;
  display: flex;
  justify-content: center;
}

.brand-logo {
  height: 54px;
  width: auto;
  transition: var(--iv-transition);
  /* Filtro dinámico basado en el tema */
  filter: brightness(0) saturate(100%) invert(31%) sepia(97%) saturate(1751%) hue-rotate(180deg) brightness(96%) contrast(101%);
}

.dark-mode .brand-logo {
  filter: brightness(0) invert(1);
}

/* Nav */
.scroller-area {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
}

.scroller-area::-webkit-scrollbar { display: none; }

.nav-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.nav-group {
  display: flex;
  flex-direction: column;
}

.group-title {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--iv-text-muted);
  letter-spacing: 0.12em;
  padding-left: 1rem;
  margin-bottom: 1rem;
}

.items-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item-btn {
  all: unset;
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  color: var(--iv-text-secondary);
  font-size: 0.925rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--iv-transition);
}

.nav-item-btn:hover {
  background-color: var(--iv-item-hover);
  color: var(--iv-primary);
}

.icon-holder {
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
  transition: color 0.2s;
}

.nav-item-btn:hover .icon-holder {
  color: var(--iv-primary);
}

.item-label {
  flex: 1;
}

/* Active State - Soft Cyan */
.nav-item-btn.is-active {
  background-color: rgba(0, 159, 227, 0.08);
  color: var(--iv-primary);
}

.nav-item-btn.is-active .icon-holder {
  color: var(--iv-primary);
}

/* Badges */
.item-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 8px;
  background-color: #f7fafc;
  color: #718096;
}

.item-badge.live {
  background-color: rgba(0, 159, 227, 0.12);
  color: var(--iv-primary);
}

.sidebar-status {
  padding-top: 1.5rem;
  border-top: 1px solid var(--iv-border);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.footer-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.status-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--iv-indicator-active);
}

.status-text {
  font-size: 0.7rem;
  color: var(--iv-text-muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.locale-switcher {
  display: flex;
  gap: 2px;
  background-color: var(--iv-surface);
  padding: 4px;
  border-radius: 10px;
  width: fit-content;
  border: 1px solid var(--iv-border);
}

.locale-switcher button {
  all: unset;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 5px 10px;
  border-radius: 7px;
  cursor: pointer;
  color: var(--iv-text-secondary);
}

.locale-switcher button:hover:not(.active) {
  background-color: var(--iv-item-hover);
  color: var(--iv-primary);
}

.locale-switcher button.active {
  background-color: var(--iv-primary);
  color: white;
}

/* Theme Toggle Button */
.theme-toggle {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background-color: var(--iv-surface);
  color: var(--iv-text-main);
  cursor: pointer;
  border: 1px solid var(--iv-border);
}

.theme-toggle:hover {
  background-color: var(--iv-primary);
  color: white;
}
</style>
