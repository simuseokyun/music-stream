import { CustomRoute, METHOD } from '../types';
import callSpotifyApi from '../utils/callSpotifyApi';
import { BASE_URL_API } from '../config';
import StatusError from '../errors/statusError';
import { errorMessages } from '..';

const userRoute: CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/me/check',
        handler: async ({ cookies }, res) => {
            try {
                console.log('쿠키는' + cookies);
                const accessToken = cookies.access_token;
                const refreshToken = cookies.refresh_token;
                console.log(accessToken, refreshToken);
                if (!refreshToken) {
                    return res.status(200).json({ loginState: false, message: '현재 로그아웃 상태입니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/me`, { token: accessToken });

                return res.json({ loginState: true, ...data });
            } catch (error) {
                if (error instanceof StatusError) {
                    return res.status(error.status).json({ message: errorMessages[error.status] });
                } else {
                    return res.status(500).json({ message: errorMessages[500] });
                }
            }
        },
    },
];
export default userRoute;
