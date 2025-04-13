import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { playlistList, addPlaylistState, alertFormState } from '../store/atoms';

export const useAddPlaylist = () => {
    const playlists = useRecoilValue(playlistList);
    const addPlaylistFormState = useSetRecoilState(addPlaylistState);
    const setAlertState = useSetRecoilState(alertFormState);
    const [openCategory, setOpenCategory] = useState(false);
    const addSong = () => {
        if (!playlists.length) {
            setAlertState((prev) => {
                return { ...prev, requiredPlaylist: true };
            });
            return;
        }
        setOpenCategory(() => true);
    };

    const mouseLeave = () => {
        setOpenCategory(() => false);
    };
    return { openCategory, addSong, mouseLeave };
};
