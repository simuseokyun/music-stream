import usePlayPreview from './usePlayPreview';
import useThrottledToast from '../common/useTrottledToast';
import { PlayState } from '../../types/models/player.';
import { useCurrentPlaylistStore } from '../../store/player';

const usePlayTrack = () => {
    const { playPreview } = usePlayPreview();
    const { setPlaylist, setIndex } = useCurrentPlaylistStore();
    const toast = useThrottledToast();
    const playTrack = async (index: number, list: PlayState[]) => {
        try {
            const result = await playPreview(list[index]);
            if (result.playState) {
                setIndex(index);
                setPlaylist([...list]);
            } else {
                playTrack(index + 1, list);
            }
        } catch {
            toast('error', '곡 재생에 실패했습니다');
        }
    };
    return { playTrack };
};
export default usePlayTrack;
