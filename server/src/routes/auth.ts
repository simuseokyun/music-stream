import { CustomRoute, METHOD } from '../types';
import callSpotifyApi from '../utils/callSpotifyApi';
import axios from 'axios';
import { client_id, client_secret, redirect_uri, baseUrl, basicAuth } from '../config';

const authRoute: CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/api/webToken',
        handler: async (req, res) => {
            // try {
            //     const params = new URLSearchParams();
            //     params.append('grant_type', 'client_credentials');
            //     params.append('client_id', client_id);
            //     params.append('client_secret', client_secret);
            //     const data = await callSpotifyApi(`${baseUrl}/api/token`, '', {
            //         data: params.toString(),
            //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //     });
            //     console.log(data, params);
            //     return res.json(data);
            // } catch {}
            try {
                const params = new URLSearchParams();
                params.append('grant_type', 'client_credentials');
                params.append('client_id', client_id);
                params.append('client_secret', client_secret);
                const response = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                const data = response.data;
                return res.json(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Spotify token fetch error:', error.response?.data || error.message);
                    return res.status(500).json({ error: 'Failed to fetch Spotify token' });
                } else if (error instanceof Error) {
                    // 일반적인 Error 타입일 때
                    console.error('Spotify token fetch error:', error.message);
                    return res.status(500).json({ error: 'Failed to fetch Spotify token' });
                } else {
                    // 그 외 예외
                    console.error('Spotify token fetch unknown error:', error);
                    return res.status(500).json({ error: 'Failed to fetch Spotify token' });
                }
            }
        },
    },
    {
        method: METHOD.POST,
        route: '/api/auth/token',
        handler: async ({ body: { code } }, res) => {
            try {
                const params = new URLSearchParams();
                params.append('code', code);
                params.append('redirect_uri', redirect_uri || '');
                params.append('grant_type', 'authorization_code');
                params.append('client_id', client_id);
                params.append('client_secret', client_secret);
                const data = await callSpotifyApi(`${baseUrl}/api/token`, '', { data: params.toString() });
                const { access_token, refresh_token } = data;
                res.cookie('access_token', access_token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 3600 * 1000,
                });
                res.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                return res.json({
                    loginSuccess: true,
                });
            } catch {
                res.status(500).json({ message: '토큰 발급 실패' });
            }
        },
    },
    {
        method: METHOD.POST,
        route: '/api/auth/refresh',
        handler: async ({ cookies }, res) => {
            const refresh_token = cookies.refresh_token;
            try {
                const data = await callSpotifyApi(`${baseUrl}/api/token`, basicAuth, {
                    method: 'POST',
                    data: new URLSearchParams({ grand_type: 'refresh_token', refresh_token, client_id }),
                });
                const { access_token, refresh_token: newRefreshToken } = data;
                res.cookie('access_token', access_token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 3600 * 1000,
                });

                res.cookie('refresh_token', data.refresh_token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 3600 * 1000,
                });
            } catch {}
        },
    },
    {
        method: METHOD.GET,
        route: '/api/logout',
        handler: ({ cookies }, res) => {
            const accessToken = cookies.access_token;
            if (!accessToken) {
                return res.status(204).json({ message: '이미 로그아웃된 상태입니다.' });
            }
            res.clearCookie('access_token', {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
            });
            res.clearCookie('refresh_token', {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
            });
            return res.json({ status: true, message: '성공적으로 로그아웃 되었습니다' });
        },
    },
];
export default authRoute;
