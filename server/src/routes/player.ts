import { CustomRoute, METHOD } from '../types';
import spotifyPreviewFinder from 'spotify-preview-finder';
const playerRoute: CustomRoute[] = [
    {
        method: METHOD.POST,
        route: '/api/preview',
        handler: async ({ query, body }, res) => {
            try {
                const { title } = query;
                const { id } = body;
                if (!title) return res.status(401).json({ message: '노래 정보가 없습니다' });
                const data = await spotifyPreviewFinder(title as string, 50);
                const songInfo = data?.results.find((track: any) => {
                    const urlParts = track.spotifyUrl.split('/');
                    const trackId = urlParts[urlParts.length - 1];
                    return id === trackId;
                });
                console.log(songInfo);
                if (!songInfo) return res.status(403).json({ error: '해당 곡은 재생할 수 없습니다' });
                if (data.success) {
                    return res.json([{ ...songInfo }]);
                } else {
                    throw new Error('에러');
                }
            } catch {}
        },
    },
];
export default playerRoute;
