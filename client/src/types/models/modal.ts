import { ReactNode } from 'react';

export interface Modal {
    modalTitle: string;
    onClose: () => void;
    children: ReactNode;
}
