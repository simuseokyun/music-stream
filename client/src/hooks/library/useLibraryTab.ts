import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLibraryTabStore, useSortTabStore } from '../../store/library';
import { useModalStore } from '../../store/common';
import { UseSortTab, UseLibraryTab } from '../../types/store/store';

const useLibraryTab = () => {
    const { active, setActive } = useLibraryTabStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeState = searchParams.get('active');
    const openModal = useModalStore((state) => state.open);
    const { active: sortState, setActive: setSotrActive } = useSortTabStore();

    const onClickSortTab = (tab: UseSortTab['active']) => {
        setSotrActive(tab);
    };
    const onClickLeftTab = (tab: UseLibraryTab['active']) => {
        setActive(tab);
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('album');
        newParams.delete('playlist');
        newParams.delete('artist');
        newParams.set('active', tab);
        setSearchParams(newParams);
    };

    useEffect(() => {
        if (activeState === 'playlist' || activeState === 'album' || activeState === 'artist') {
            setActive(activeState);
        } else {
            setActive('playlist');
        }
    }, [activeState]);
    return { active, openModal, onClickSortTab, onClickLeftTab, sortState, activeState };
};
export default useLibraryTab;
