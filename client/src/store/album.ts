import { create } from 'zustand';
import { UseAlbumInfo } from '../types/store/store';

const useAlbumStore = create<UseAlbumInfo>((set) => ({
    id: '',
    name: '',
    artist_id: '',
    artist_name: '',
    image: '',
    type: '',
    track_length: 0,
    setAlbumInfo: (state) => {
        set(() => ({
            id: state.id,
            name: state.name,
            artist_id: state.artist_id,
            artist_name: state.artist_name,
            image: state.image,
            type: state.type,
            track_length: state.track_length,
        }));
    },
}));
export default useAlbumStore;
