import { useLibraryTabStore } from '../../store/library';
import { useSearchParams } from 'react-router-dom';
import { useModalStore } from '../../store/common';
import { useEffect } from 'react';
import { useSortTabStore } from '../../store/library';

const useLibraryTab = () => {
    const { active, setActive } = useLibraryTabStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeState = searchParams.get('active');
    const openModal = useModalStore((state) => state.open);
    const { active: sortState, setActive: setSotrActive } = useSortTabStore();

    const onClickGridTab = (tab: 'grid' | 'flex') => {
        setSotrActive(tab);
    };
    const onClickTab = (tab: 'album' | 'playlist') => {
        setActive(tab);
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('album');
        newParams.delete('playlist');
        newParams.set('active', tab);
        setSearchParams(newParams);
    };

    useEffect(() => {
        if (activeState === 'playlist' || activeState === 'album') {
            setActive(activeState);
        } else {
            setActive('playlist');
        }
    }, [activeState]);
    return { active, openModal, onClickGridTab, onClickTab, sortState, activeState };
};
export default useLibraryTab;
