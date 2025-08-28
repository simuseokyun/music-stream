import usePlayPreview from './usePlayPreview';
import usePlayThrottle from './usePlayThrottle';
import useThrottledToast from '../common/useTrottledToast';
import { useCurrentPlaylistStore, usePlayerStore } from '../../store/player';

const usePlayerControl = () => {
    const toast = useThrottledToast();
    const { playPreview } = usePlayPreview();
    const { isPlaying, setIsPlaying } = usePlayerStore();
    const { playlist, currentIndex, setIndex } = useCurrentPlaylistStore();
    const onToggle = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    };
    const playNextTrack = async (index: number, isAuto: boolean) => {
        const nextTrack = playlist[index];
        if (!nextTrack) {
            if (isAuto) {
                toast('info', '다음 트랙이 없습니다');
                setIsPlaying(false);
            } else {
                toast('info', '다음 트랙이 없습니다');
            }
            return;
        }
        setIndex(index);
        const { id, title, artist, image } = nextTrack;
        const result = await playPreview({ id, title, artist, image });
        if (!result.playState) {
            await playNextTrack(index + 1, true);
        }
    };
    const onNext = usePlayThrottle(async () => {
        playNextTrack(currentIndex + 1, true);
    });
    const onClickNext = usePlayThrottle(async () => {
        playNextTrack(currentIndex + 1, false);
    });

    const onPrev = usePlayThrottle(async () => {
        const prevTrack = playlist[currentIndex - 1];
        if (!prevTrack) {
            toast('info', '이전 트랙이 없습니다');
            return;
        }
        setIndex(currentIndex - 1);
        const { id, title, artist, image } = prevTrack;
        await playPreview({
            id,
            title,
            artist,
            image,
        });
    });
    return { onToggle, onNext, onClickNext, onPrev };
};

export default usePlayerControl;
