import usePlayerStore from '../store/player';
import { TrackToPlay } from '../types/models/player.';
const usePlayPreview = () => {
    const { setState } = usePlayerStore();
    const playPreview = async ({ id, title, artist, image }: TrackToPlay) => {
        console.log(id, title, artist, image);
        try {
            const response = await fetch(`/api/preview?title=${encodeURIComponent(title)}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('API 요청 실패');
            }
            const res = await response.json();

            setState({ title, artist, url: res[0].previewUrls[0], image });
            return { success: true, data: res, image };
        } catch (error) {
            return { success: false, error };
        }
    };

    return { playPreview };
};

export default usePlayPreview;
