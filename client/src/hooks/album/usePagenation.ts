import { useState, useMemo } from 'react';
import { useViewportStore } from '../../store/common';

export const usePagenation = (itemsLength: number) => {
    const { isMobile } = useViewportStore();
    const [index, setIndex] = useState(0);
    const offset = isMobile ? 6 : 8;
    const maxPage = useMemo(() => {
        return Math.ceil(itemsLength / offset) - 1;
    }, [itemsLength, offset]);

    const onNext = () => setIndex((prev) => (prev >= maxPage ? 0 : prev + 1));
    const onPrev = () => setIndex((prev) => (prev <= 0 ? maxPage : prev - 1));

    return { isMobile, index, setIndex, onNext, onPrev, offset };
};
