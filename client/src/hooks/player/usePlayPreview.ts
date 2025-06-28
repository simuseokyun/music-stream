import axios from 'axios';
import { usePlayerStore } from '../../store/player';
import { TrackToPlay } from '../../types/models/player.';
import useThrottledToast from '../common/useTrottledToast';

const usePlayPreview = () => {
    const toast = useThrottledToast();
    const { setState } = usePlayerStore();
    const playPreview = async ({ id, title, artist, image }: TrackToPlay) => {
        try {
            const response = await axios.post(`/api/preview?title=${encodeURIComponent(title)}`, { id });
            const data = response.data;
            setState({ title, artist, url: data[0].previewUrls[0], image });
            return { success: true, data: data, image };
        } catch (error) {
            toast('error', `해당 곡은 재생할 수 없습니다. 다음 트랙으로 넘어갑니다`, id);
            return { success: false, error };
        }
    };
    return { playPreview };
};

export default usePlayPreview;
