import { useRef } from 'react';
import { TrackToPlay } from '../types/models/player.';
function useThrottle<T extends (...args: TrackToPlay[]) => any>(callback: T, delay: number = 500) {
    const lastTime = useRef(0);
    return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastTime.current > delay) {
            callback(...args);
            lastTime.current = now;
        }
    };
}

export default useThrottle;
