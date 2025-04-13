import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { setMobile } from '../store/atoms';
export const useHandleResize = () => {
    const setMobileState = useSetRecoilState(setMobile);
    const [isMobile, setIsMobile] = useState(false);
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth <= 768) {
            setMobileState(() => true);
        } else {
            setMobileState(() => false);
        }
    };
    return { isMobile, handleResize };
};
