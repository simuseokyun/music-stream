import axios from 'axios';
import useThrottledToast from '../common/useTrottledToast';
import { PlayState } from '../../types/models/player.';
import { usePlayerStore } from '../../store/player';
import { usePlayerKey } from '../../store/common';

const usePlayPreview = () => {
    const toast = useThrottledToast();
    const { url, setPlayerState } = usePlayerStore();
    const { key, setKey } = usePlayerKey();
    const playPreview = async ({ id, title, artist, image }: PlayState) => {
        try {
            const response = await axios.post(`/api/preview?title=${encodeURIComponent(title)}`, { id });
            console.log(response);
            const data = response.data;
            if (url === data[0]?.previewUrls[0]) {
                setKey(key + 1);
            } else {
                setKey(0);
            }
            setPlayerState({ title, artist, url: data[0].previewUrls[0], image });
            return { playState: true, message: '재생 성공' };
        } catch {
            toast('error', `${title} : 해당 곡은 재생할 수 없습니다. 다음 트랙으로 넘어갑니다`);
            return { playState: false, message: '재생 실패' };
        }
    };
    return { playPreview };
};

export default usePlayPreview;
