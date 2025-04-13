import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { setMobile } from '../store/atoms';

export const usePagenation = () => {
    const isMobile = useRecoilValue(setMobile);
    const [index, setIndex] = useState(0);
    const onNextBtn = () => {
        if (isMobile) {
            setIndex((prev) => (prev === 6 ? 0 : prev + 1));
        } else {
            setIndex((prev) => (prev === 4 ? 0 : prev + 1));
        }
    };
    const onPrevBtn = () => {
        if (isMobile) {
            setIndex((prev) => (prev === 0 ? 6 : prev - 1));
        } else {
            setIndex((prev) => (prev === 0 ? 4 : prev - 1));
        }
    };
    return { isMobile, index, setIndex, onNextBtn, onPrevBtn };
};
