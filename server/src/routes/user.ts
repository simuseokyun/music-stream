import { CustomRoute, METHOD } from '../types';
import callSpotifyApi from '../utils/callSpotifyApi';

const baseUrl = process.env.BASE_URL;
const userRoute: CustomRoute[] = [
    // {
    //     method: METHOD.GET,
    //     route: '/api/me',
    //     handler: async ({ cookies }, res) => {
    //         try {
    //             const accessToken = cookies.access_token;
    //             const refreshToken = cookies.refresh_token;
    //             if (!accessToken) {
    //                 return res.status(401).json({ message: '로그인이 필요합니다.' });
    //             }
    //             const data = await callSpotifyApi(`${baseUrl}/v1/me`, accessToken);
    //         } catch {}
    //     },
    // },
];
export default userRoute;
