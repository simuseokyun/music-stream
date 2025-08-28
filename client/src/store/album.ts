import { create } from 'zustand';
import { UseAlbumInfo } from '../types/store/store';

const useAlbumStore = create<UseAlbumInfo>((set) => ({
    id: '',
    name: '',
    artistId: '',
    artistName: '',
    image: '',
    type: '',
    trackLength: 0,
    setAlbumInfo: ({ id, name, artistId, artistName, image, type, trackLength }) => {
        set(() => ({
            id,
            name,
            artistId,
            artistName,
            image,
            type,
            trackLength,
        }));
    },
}));
export default useAlbumStore;
