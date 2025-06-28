import { useRef } from 'react';
import { toast } from 'react-toastify';

function useThrottledToast() {
    const lastToastTimeRef = useRef(0);
    return (type: 'info' | 'error' | 'success', message: string, toastId: string) => {
        const now = Date.now();
        if (now - lastToastTimeRef.current > 2000) {
            lastToastTimeRef.current = now;
            toast[type](message, { toastId, icon: false });
        }
    };
}

export default useThrottledToast;
