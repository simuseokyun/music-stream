export interface NavItem {
    icon: string;
    label: string;
    onClick: () => void;
    active?: boolean;
}
