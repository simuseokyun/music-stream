import useModalStore from '../../store/useModalStore';
import { AddPlaylistModal } from './AddplaylistModal';
import { PlaylistCategory } from '../common/PlaylistCategory';

export const ModalContainer = () => {
    const { type, close } = useModalStore();

    if (!type) return null;

    return (
        <>
            {type === 'addPlaylist' && <AddPlaylistModal onClose={close} />}
            {type === 'selectPlaylist' && <PlaylistCategory onClose={close} />}
        </>
    );
};
