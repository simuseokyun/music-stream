import { useSetRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { playlistList, alertFormState } from '../store/atoms';
export const useAddTrack = (
    id: string,
    name: string,
    cover: string,
    albumTitle: string,
    artists: { name: string; id: string }[],
    albumId: string,
    uri: string
) => {
    const setPlaylist = useSetRecoilState(playlistList);
    const [dupState, setDupState] = useState<boolean | null>(null);
    const setAlertState = useSetRecoilState(alertFormState);
    useEffect(() => {
        if (dupState) {
            setAlertState((prev) => ({ ...prev, duplicateSong: true }));
        } else if (dupState !== null && !dupState) {
            setAlertState((prev) => ({ ...prev, addSong: true }));
        }
        setDupState(null);
    }, [dupState]);
    const addTrack = (event: React.MouseEvent<HTMLLIElement>) => {
        const {
            currentTarget: { textContent },
        } = event;
        setPlaylist((prev) => {
            const newTrack = { id, title: name, cover, albumTitle, artists, albumId, uri };
            const prevArray = prev.map((prev) => {
                if (prev.title === textContent) {
                    const confirm = prev.tracks.find((track) => {
                        return track.uri === uri;
                    });
                    if (confirm) {
                        setDupState(true);
                        return prev;
                    }
                    setDupState(false);

                    return {
                        ...prev,
                        tracks: [...prev.tracks, newTrack],
                    };
                }
                return prev;
            });

            return prevArray;
        });
    };

    return { addTrack };
};
