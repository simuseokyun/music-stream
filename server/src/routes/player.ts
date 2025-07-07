import { CustomRoute, METHOD } from '../types';
import spotifyPreviewFinder from 'spotify-preview-finder';
import { errorMessages } from '..';
import { isAxiosError } from 'axios';
const playerRoute: CustomRoute[] = [
    {
        method: METHOD.POST,
        route: '/api/preview',
        handler: async ({ query, body }, res) => {
            try {
                const { title } = query;
                const { id } = body;
                if (!title || !id) return res.status(401).json({ message: '곡 정보를 찾을 수 없습니다' });
                const data = await spotifyPreviewFinder(title as string, 20);
                const trackInfo = data?.results.find((track: { spotifyUrl: string }) => {
                    const urlParts = track.spotifyUrl.split('/');
                    const trackId = urlParts[urlParts.length - 1];
                    return id === trackId;
                });
                if (!trackInfo || !data.success) {
                    return res.status(403).json({ message: '해당 곡은 재생할 수 없습니다' });
                }
                return res.json([{ ...trackInfo }]);
            } catch (error) {
                if (isAxiosError(error)) {
                    return res
                        .status(error.response?.status || 500)
                        .json({ message: errorMessages[error.response?.status || 500] });
                } else {
                    return res.status(500).json({ message: errorMessages[500] });
                }
            }
        },
    },
];
export default playerRoute;
