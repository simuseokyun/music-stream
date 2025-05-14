import { create } from 'zustand';

interface State {
    id: string;
    name: string;
    image: string;
    owner: string;
    description: string;
}

interface IPlaylistInfo extends State {
    setPlaylistInfo: (state: State) => void;
}

const usePlaylistInfo = create<IPlaylistInfo>((set) => ({
    id: '',
    name: '',
    image: '',
    owner: '',
    description: '',
    track_length: 0,
    setPlaylistInfo: (state) => {
        set(() => ({
            id: state.id,
            name: state.name,
            image: state.image,
            description: state.description,
            owner: state.owner,
        }));
    },
}));
export default usePlaylistInfo;
