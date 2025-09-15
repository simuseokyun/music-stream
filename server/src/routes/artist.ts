import { CustomRoute, METHOD } from '../types';
import callSpotifyApi from '../utils/callSpotifyApi';
import { BASE_URL_API } from '../config';
import StatusError from '../errors/statusError';
import { errorMessages } from '..';
const artistRoute: CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/me/artists',
        handler: async ({ cookies }, res) => {
            try {
                const token = cookies.access_token;
                if (!token) {
                    return res.status(401).json({ message: '엑세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/me/following?type=artist&limit=20`, {
                    token,
                });
                return res.json(data);
            } catch (error) {
                if (error instanceof StatusError) {
                    return res.status(error.status).json({ message: errorMessages[error.status] });
                } else {
                    return res.status(500).json({ message: errorMessages[500] });
                }
            }
        },
    },
    {
        method: METHOD.GET,
        route: '/me/artists/check',
        handler: async ({ query, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const ids = query.id;

                if (!token) {
                    return res.status(401).json({ message: '엑세스 토큰이 존재하지 않습니다' });
                }
                const response = await callSpotifyApi(
                    `${BASE_URL_API}/v1/me/following/contains?type=artist&ids=${ids}`,
                    {
                        token,
                    }
                );

                return res.json({ following: response[0] });
            } catch (error) {
                if (error instanceof StatusError) {
                    return res.status(error.status).json({ message: errorMessages[error.status] });
                } else {
                    return res.status(500).json({ message: errorMessages[500] });
                }
            }
        },
    },
    {
        method: METHOD.PUT,
        route: '/me/artists/follow',
        handler: async ({ body, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const ids = body.ids;
                if (!token) {
                    return res.status(401).json({ message: '엑세스 토큰이 존재하지 않습니다' });
                }
                await callSpotifyApi(`${BASE_URL_API}/v1/me/following?type=artist&ids=${ids}`, {
                    method: 'PUT',
                    token,
                    data: { ids: [ids] },
                });
                return res.json({ message: '아티스트를 팔로우 했습니다' });
            } catch (error) {
                if (error instanceof StatusError) {
                    return res.status(error.status).json({ message: errorMessages[error.status] });
                } else {
                    return res.status(500).json({ message: errorMessages[500] });
                }
            }
        },
    },
    {
        method: METHOD.DELETE,
        route: '/me/artists/unfollow',
        handler: async ({ body, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const ids = body.ids;
                if (!token) {
                    return res.status(401).json({ message: '엑세스 토큰이 존재하지 않습니다' });
                }
                await callSpotifyApi(`${BASE_URL_API}/v1/me/following?type=artist`, {
                    method: 'DELETE',
                    token,
                    data: { ids: [ids] },
                });
                return res.json({ message: '아티스트 팔로우를 해제했습니다' });
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

export default artistRoute;
