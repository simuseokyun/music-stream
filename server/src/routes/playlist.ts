import { CustomRoute, METHOD } from '../types';
import callSpotifyApi from '../utils/callSpotifyApi';
const baseUrl = process.env.BASE_URL;
export const playlistRoute: CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/api/me/playlists',
        handler: async ({ query, cookies }, res) => {
            try {
                const offset = query.cursor;
                const accessToken = cookies.access_token;
                if (!accessToken) {
                    return res.status(401).json({ error: 'Access token is missing' });
                }
                const data = await callSpotifyApi(`${baseUrl}/v1/me/playlists?limit=10&offset=${offset}`, accessToken);
                return res.json(data);
            } catch {}
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
                    return res.status(401).json({ error: 'Access token is missing' });
                }
                const data = await callSpotifyApi(
                    `${baseUrl}/v1/playlists/${playlistId}/tracks?offset=${offset}`,
                    accessToken
                );
                return res.json(data);
            } catch {}
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
                    return res.status(401).json({ error: 'Access token is missing' });
                }
                const data = await callSpotifyApi(`${baseUrl}/v1/playlists/${playlistId}`, accessToken);
                return res.json(data);
            } catch {}
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
                    return res.status(401).json({ error: 'Access token is missing' });
                }
                const data = await callSpotifyApi(`${baseUrl}/v1/users/${user}/playlists`, accessToken, {
                    method: 'POST',
                    data: { name, description, user },
                });
                return res.json(data);
            } catch {}
        },
    },
    {
        method: METHOD.POST,
        route: '/api/me/playlist/track/add/:playlistId',
        handler: async ({ body, params, cookies }, res) => {
            try {
                const accessToken = cookies.access_token;
                const playlistId = params.playlistId;
                const uri = body.trackUri;
                if (!accessToken) {
                    return res.status(401).json({ error: 'Access token is missing' });
                }
                const data = await callSpotifyApi(`${baseUrl}/v1/playlists/${playlistId}/tracks`, accessToken, {
                    method: 'POST',
                    data: { uris: [uri] },
                });
                return res.json(data);
            } catch {}
        },
    },
    {
        method: METHOD.DELETE,
        route: '/api/me/playlist/track/delete/:playlistId',
        handler: async ({ body, params, cookies }, res) => {
            try {
                const accessToken = cookies.access_token;
                const playlistId = params.playlistId;
                const uri = body.trackUri;
                if (!accessToken) {
                    return res.status(401).json({ error: 'Access token is missing' });
                }
                const data = await callSpotifyApi(`${baseUrl}/v1/playlists/${playlistId}/tracks`, accessToken, {
                    method: 'DELETE',
                    data: { trakcs: [{ uri, position: 0 }] },
                });
                return res.json(data);
            } catch {}
        },
    },
];
