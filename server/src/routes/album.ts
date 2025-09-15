import { CustomRoute, METHOD } from '../types';
import callSpotifyApi from '../utils/callSpotifyApi';
import { BASE_URL_API } from '../config';
import StatusError from '../errors/statusError';
import { errorMessages } from '..';

const albumRoute: CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/me/albums',
        handler: async ({ query, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const offset = query.cursor;
                if (!token) {
                    return res.status(401).json({ message: '엑세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/me/albums?limit=20&offset=${offset}`, {
                    token,
                });
                const filterData = data?.items.filter((a: { album: { name: string } }) => a !== null); // 알 수 없는 이유로 내부에 null 요소가 있어서 데이터 가공
                return res.json({ ...data, items: filterData });
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
        route: '/me/albums/add',
        handler: async ({ body, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const ids = body.ids;
                if (!token) {
                    return res.status(401).json({ message: '엑세스 토큰이 존재하지 않습니다' });
                }
                await callSpotifyApi(`${BASE_URL_API}/v1/me/albums`, {
                    method: 'PUT',
                    token,
                    data: { ids },
                });
                return res.json({ message: '앨범을 보관함에 저장하였습니다' });
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
        route: '/me/albums/delete',
        handler: async ({ body, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const ids = body.ids;
                if (!token) {
                    return res.status(401).json({ message: '엑세스 토큰이 존재하지 않습니다' });
                }
                await callSpotifyApi(`${BASE_URL_API}/v1/me/albums`, {
                    method: 'DELETE',
                    token,
                    data: { ids },
                });
                return res.json({ message: '앨범을 보관함에서 삭제하였습니다' });
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
        route: '/me/albums/check',
        handler: async ({ query, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const albumId = query.id;
                if (!token) {
                    return res.status(401).json({ message: '엑세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/me/albums/contains?ids=${albumId}`, {
                    token,
                });
                return res.json({ liked: data[0] });
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
export default albumRoute;
