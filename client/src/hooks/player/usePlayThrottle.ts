import { useRef, useCallback } from 'react';

function usePlayThrottle(onPlay: (args: { id: string }) => void | Promise<void>, delay = 1000) {
    const lastTime = useRef(0);
    return useCallback(
        (args: { id: string }) => {
            const now = Date.now();
            if (now - lastTime.current > delay) {
                lastTime.current = now;
                onPlay(args);
            }
        },
        [onPlay, delay]
    );
}

export default usePlayThrottle;
