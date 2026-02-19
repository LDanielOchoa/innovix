export interface NavItem {
    id: string;
    label: string;
    icon: string; // Nombre del icono de Lucide
    section: 'principal' | 'operaciones' | 'gestion';
    badge?: string;
    badgeType?: 'live' | 'default';
    order: number;
}

export interface NavSection {
    id: string;
    title: string;
    items: NavItem[];
}
