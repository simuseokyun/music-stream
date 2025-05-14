import { create } from 'zustand';

interface State {
    id: string;
    name: string;
    artist_id: string;
    artist_name: string;
    image: string;
    type: string;
    track_length: number;
}

interface IAlbumInfo extends State {
    setAlbumInfo: (state: State) => void;
}

const useAlbumInfo = create<IAlbumInfo>((set) => ({
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
export default useAlbumInfo;
