import { defineStore } from 'pinia';
import type { NavItem } from '../domain/types';

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        activeItemId: 'dashboard',
        estaColapsado: false,
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: 'IconLayoutDashboard', section: 'principal', order: 1 },
            { id: 'tracking', label: 'Tracking', icon: 'IconActivity', section: 'operaciones', badge: 'En vivo', badgeType: 'live', order: 2 },
            { id: 'mapa', label: 'Mapa', icon: 'IconMap2', section: 'operaciones', order: 3 },
            { id: 'administracion', label: 'Administración', icon: 'IconShieldCheck', section: 'gestion', order: 4 },
            { id: 'configuracion', label: 'Ajustes del Sistema', icon: 'IconSettings', section: 'gestion', order: 5 },
        ] as NavItem[]
    }),

    getters: {
        sections: (state) => {
            const sections = [
                { id: 'principal', title: 'Principal', items: [] as NavItem[] },
                { id: 'operaciones', title: 'Operaciones', items: [] as NavItem[] },
                { id: 'gestion', title: 'Gestión', items: [] as NavItem[] }
            ];

            state.items.forEach(item => {
                const section = sections.find(s => s.id === item.section);
                if (section) section.items.push(item);
            });

            sections.forEach(s => s.items.sort((a, b) => a.order - b.order));
            return sections.filter(s => s.items.length > 0);
        }
    },

    actions: {
        setActive(id: string) {
            this.activeItemId = id;
        },

        alternarColapso() {
            this.estaColapsado = !this.estaColapsado;
        },

        registerItem(item: NavItem) {
            this.items.push(item);
        }
    }
});
