import useThrottledToast from '../common/useTrottledToast';
import { useCurrentPlaylistStore, usePlayerStore } from '../../store/player';
import usePlayPreview from './usePlayPreview';
import usePlayThrottle from './usePlayThrottle';
const usePlayerControl = () => {
    const { playPreview } = usePlayPreview();
    const toast = useThrottledToast();
    const { isPlaying, setIsPlaying, url } = usePlayerStore();
    const { playlist, currentIndex, setIndex } = useCurrentPlaylistStore();
    const playerControl = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else if (!isPlaying) {
            setIsPlaying(true);
        }
    };
    const playNextTrack = async (index: number) => {
        const nextTrack = playlist[index];
        console.log(nextTrack);
        if (!nextTrack) {
            console.log(nextTrack);

            toast('info', '재생할 곡이 없습니다', url);
            setIsPlaying(false);
            return;
        }
        setIndex(index);
        const { id, title, artist, image } = nextTrack;
        const result = await playPreview({ id, title, artist, image });
        if (!result.success) {
            console.log('에러났네? 다음 곡으로...');
            await playNextTrack(index + 1);
        }
    };
    const onNext = usePlayThrottle(async () => {
        playNextTrack(currentIndex + 1);
    });

    const onPrev = usePlayThrottle(() => {
        const prevIndex = currentIndex - 1;
        const prevTrack = playlist[prevIndex];
        if (!prevTrack) {
            toast('info', '재생할 곡이 없습니다', url);
            return;
        }
        setIndex(prevIndex);
        const { id, title, artist, image } = prevTrack;
        playPreview({
            id,
            title,
            artist,
            image,
        });
    });
    return { playerControl, onNext, onPrev };
};

export default usePlayerControl;
