import { CustomRoute, METHOD } from '../types';
import callSpotifyApi from '../utils/callSpotifyApi';
const baseUrl = process.env.BASE_URL;
const albumRoute: CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/api/me/albums',
        handler: async ({ query, cookies }, res) => {
            try {
                const offset = query.cursor;
                const accessToken = cookies.access_token;
                const data = await callSpotifyApi(`${baseUrl}/v1/me/albums?limit=20&offset=${offset}`, accessToken);
                const newData: any = data?.items.filter((a: any) => a !== null); // 알 수 없는 이유로 내부에 null 요소가 있어서 데이터 가공
                return res.json({ ...data, items: newData });
            } catch (error) {
                return res.status(500).json({ error: '서버 에러입니다.' });
            }
        },
    },
    {
        method: METHOD.PUT,
        route: '/api/me/albums/add',
        handler: async ({ body, cookies }, res) => {
            try {
                const ids = body.ids;
                const accessToken = cookies.access_token;
                const data = await callSpotifyApi(`${baseUrl}/v1/me/albums`, accessToken, {
                    method: 'PUT',
                    data: { ids },
                });

                return res.json({ message: '저장 완료' });
            } catch (error) {
                return res.status(500).json({ error: '서버 에러입니다.' });
            }
        },
    },
    {
        method: METHOD.DELETE,
        route: '/api/me/albums/delete',
        handler: async ({ body, cookies }, res) => {
            try {
                const ids = body.ids;
                const accessToken = cookies.access_token;
                const data = await callSpotifyApi(`${baseUrl}/v1/me/albums`, accessToken, {
                    method: 'DELETE',
                    data: { ids },
                });

                return res.json({ message: '삭제 완료' });
            } catch (error) {
                return res.status(500).json({ error: '서버 에러입니다.' });
            }
        },
    },
    {
        method: METHOD.GET,
        route: '/api/me/albums/check',
        handler: async ({ query, cookies }, res) => {
            try {
                const albumId = query.id;
                const accessToken = cookies.access_token;
                const data = await callSpotifyApi(`${baseUrl}/v1/me/albums/contains?ids=${albumId}`, accessToken);
                return res.json(data);
            } catch (error) {
                return res.status(500).json({ error: '서버 에러입니다.' });
            }
        },
    },
];
export default albumRoute;
