import { useRef } from 'react';
function usePlayThrottle<T extends (...args: any[]) => void | Promise<void>>(onPlay: T, delay = 1000) {
    const lastTime = useRef(0);
    return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastTime.current > delay) {
            onPlay(...args);
            lastTime.current = now;
        }
    };
}

export default usePlayThrottle;
