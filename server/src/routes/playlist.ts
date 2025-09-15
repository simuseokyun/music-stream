import { CustomRoute, METHOD } from '../types';
import callSpotifyApi from '../utils/callSpotifyApi';
import { BASE_URL_API } from '../config';
import StatusError from '../errors/statusError';
import { errorMessages } from '..';
export const playlistRoute: CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/me/playlists',
        handler: async ({ query, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const offset = query.cursor;
                if (!token) {
                    return res.status(401).json({ error: '엑세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/me/playlists?limit=10&offset=${offset}`, {
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
        route: '/me/playlist/:id',
        handler: async ({ params, query, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const playlistId = params.id;
                const offset = query.cursor;
                if (!token) {
                    return res.status(401).json({ message: '액세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(
                    `${BASE_URL_API}/v1/playlists/${playlistId}/tracks?offset=${offset}`,
                    { token }
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
        route: '/me/playlist/info/:playlistId',
        handler: async ({ params, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const playlistId = params.playlistId;
                if (!token) {
                    return res.status(401).json({ message: '엑세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/playlists/${playlistId}`, { token });
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
        route: '/me/playlist/add',
        handler: async ({ body, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const { name, description, user } = body;
                if (!token) {
                    return res.status(401).json({ message: '액세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/users/${user}/playlists`, {
                    method: 'POST',
                    token,
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
        route: '/me/playlist/delete/:playlistId',
        handler: async ({ params, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const playlistId = params.playlistId;
                if (!token) {
                    return res.status(401).json({ message: '액세스 토큰이 존재하지 않습니다' });
                }
                await callSpotifyApi(`${BASE_URL_API}/v1/playlists/${playlistId}/followers`, {
                    method: 'DELETE',
                    token,
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
        route: '/me/playlist/track/add/:playlistId',
        handler: async ({ body, params, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const playlistId = params.playlistId;
                const trackId = body.trackId;
                if (!token) {
                    return res.status(401).json({ error: '액세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    token,
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
        route: '/me/playlist/track/delete/:playlistId',
        handler: async ({ body, params, cookies }, res) => {
            try {
                const token = cookies.access_token;
                const playlistId = params.playlistId;
                const id = body.id;
                if (!token) {
                    return res.status(401).json({ message: '액세스 토큰이 존재하지 않습니다' });
                }
                const data = await callSpotifyApi(`${BASE_URL_API}/v1/playlists/${playlistId}/tracks`, {
                    method: 'DELETE',
                    token,
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
