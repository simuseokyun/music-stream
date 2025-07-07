import { CustomRoute, METHOD } from '../types';
import callSpotifyApi from '../utils/callSpotifyApi';
import { BASE_URL_API } from '../config';
import StatusError from '../errors/statusError';
import { errorMessages } from '..';
export const playlistRoute: CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/api/me/playlists',
        handler: async ({ query, cookies }, res) => {
            try {
                const offset = query.cursor;
                const accessToken = cookies.access_token;
                if (!accessToken) {
                    return res.status(401).json({ error: '엑세스 토큰이 존재하지 않습니다.' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/me/playlists?limit=10&offset=${offset}`, {
                    token: accessToken,
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
        route: '/api/me/playlist/:id',
        handler: async ({ params, query, cookies }, res) => {
            try {
                const playlistId = params.id;
                const offset = query.cursor;
                const accessToken = cookies.access_token;
                if (!accessToken) {
                    return res.status(401).json({ message: '액세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(
                    `${BASE_URL_API}/v1/playlists/${playlistId}/tracks?offset=${offset}`,
                    {
                        token: accessToken,
                    }
                );
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
        route: '/api/me/playlist/info/:playlistId',
        handler: async ({ params, cookies }, res) => {
            try {
                const playlistId = params.playlistId;
                const accessToken = cookies.access_token;
                if (!accessToken) {
                    return res.status(401).json({ message: '엑세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/playlists/${playlistId}`, { token: accessToken });
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
        method: METHOD.POST,
        route: '/api/me/playlist/add',
        handler: async ({ body, cookies }, res) => {
            try {
                const { name, description, user } = body;
                const accessToken = cookies.access_token;
                if (!accessToken) {
                    return res.status(401).json({ message: '액세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/users/${user}/playlists`, {
                    method: 'POST',
                    token: accessToken,
                    data: { name, description, user },
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
        method: METHOD.DELETE,
        route: '/api/me/playlist/delete/:playlistId',
        handler: async ({ params, cookies }, res) => {
            try {
                const playlistId = params.playlistId;
                const accessToken = cookies.access_token;
                if (!accessToken) {
                    return res.status(401).json({ message: '액세스 토큰이 존재하지 않습니다' });
                }
                await callSpotifyApi(`${BASE_URL_API}/v1/playlists/${playlistId}/followers`, {
                    method: 'DELETE',
                    token: accessToken,
                });
                return res.json({ message: '플레이리스트를 삭제하였습니다' });
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
        method: METHOD.POST,
        route: '/api/me/playlist/track/add/:playlistId',
        handler: async ({ body, params, cookies }, res) => {
            try {
                const accessToken = cookies.access_token;
                const playlistId = params.playlistId;
                const trackId = body.trackId;
                if (!accessToken) {
                    return res.status(401).json({ error: '액세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    token: accessToken,
                    data: { uris: [`spotify:track:${trackId}`] },
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
        method: METHOD.DELETE,
        route: '/api/me/playlist/track/delete/:playlistId',
        handler: async ({ body, params, cookies }, res) => {
            try {
                const accessToken = cookies.access_token;
                const playlistId = params.playlistId;
                const id = body.id;
                if (!accessToken) {
                    return res.status(401).json({ message: '액세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/playlists/${playlistId}/tracks`, {
                    method: 'DELETE',
                    token: accessToken,
                    data: { tracks: [{ uri: `spotify:track:${id}`, position: 0 }] },
                    headers: { 'Content-Type': 'application/json' },
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
];
