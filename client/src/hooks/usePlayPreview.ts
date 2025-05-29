import usePlayerState from '../store/usePlayerState';

interface State {
    id: string;
    title: string;
    artist: string;
    image: string;
}
const usePlayPreview = () => {
    const { setState } = usePlayerState();
    const playPreview = async ({ id, title, artist, image }: State) => {
        console.log(id, title, artist, image);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URI}/api/preview?title=${encodeURIComponent(title)}`,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                }
            );
            console.log(response);
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
