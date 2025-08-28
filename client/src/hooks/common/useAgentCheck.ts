import { useEffect } from 'react';
import { useViewportStore } from '../../store/common';
const useAgentCheck = () => {
    const { setIsMobile } = useViewportStore();
    useEffect(() => {
        const mobileMedia = window.matchMedia('(max-width: 767px)');
        const updateIsMobile = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };
        updateIsMobile(mobileMedia);
        mobileMedia.addEventListener('change', updateIsMobile);
        return () => {
            mobileMedia.removeEventListener('change', updateIsMobile);
        };
    }, [setIsMobile]);
};
export default useAgentCheck;
