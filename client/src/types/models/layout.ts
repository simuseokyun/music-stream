export interface NavItem {
    icon: string;
    label: string;
    onClick: () => void;
    active?: boolean;
}
export interface Pagenation {
    onPrev: () => void;
    onNext: () => void;
}
