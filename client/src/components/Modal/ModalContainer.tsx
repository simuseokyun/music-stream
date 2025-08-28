import AddPlaylistModal from './AddplaylistModal';
import PlaylistCategory from '../common/PlaylistCategory';
import { useModalStore } from '../../store/common';

export default function ModalContainer() {
    const { type, close } = useModalStore();
    const modalMap = {
        addPlaylist: <AddPlaylistModal onClose={close} />,
        selectPlaylist: <PlaylistCategory onClose={close} />,
    } as const;
    return type ? modalMap[type] : null;
}
