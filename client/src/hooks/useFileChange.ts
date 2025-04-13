import { useRef } from 'react';

export const useFileChange = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
};
