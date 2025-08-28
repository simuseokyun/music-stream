import { useRef } from 'react';
import { toast } from 'react-toastify';

const useThrottledToast = () => {
    const lastToastTimeRef = useRef(0);
    return (type: 'info' | 'error' | 'success', message: string) => {
        const now = Date.now();
        if (now - lastToastTimeRef.current > 1000) {
            lastToastTimeRef.current = now;
            toast[type](message, { icon: false });
        }
    };
};

export default useThrottledToast;
