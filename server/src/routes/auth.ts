import axios, { isAxiosError } from 'axios';
import { CustomRoute, METHOD } from '../types';
import callSpotifyApi from '../utils/callSpotifyApi';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, BASE_URL_AUTH, BASIC_AUTH } from '../config';
import StatusError from '../errors/statusError';
import { errorMessages } from '..';

const authRoute: CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/api/webToken',
        handler: async (_req, res) => {
            try {
                const params = new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                });
                console.log(BASE_URL_AUTH);
                const response = await axios.post(`${BASE_URL_AUTH}/api/token`, params.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                const data = response.data;
                return res.json(data);
            } catch (error) {
                if (isAxiosError(error)) {
                    return res.status(error.status || 500).json({ message: errorMessages[error.status || 500] });
                } else {
                    return res.status(500).json({ message: errorMessages[500] });
                }
            }
        },
    },
    {
        method: METHOD.POST,
        route: '/auth/sdkToken',
        handler: async ({ body: { code } }, res) => {
            try {
                const params = new URLSearchParams({
                    code,
                    redirect_uri: REDIRECT_URI,
                    grant_type: 'authorization_code',
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                }).toString();

                const data = await callSpotifyApi(`${BASE_URL_AUTH}/api/token`, {
                    method: 'POST',
                    token: BASIC_AUTH,
                    data: params,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    auth: true,
                });

                const { access_token, refresh_token } = data;
                res.cookie('access_token', access_token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 1000,
                });
                res.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 14 * 24 * 60 * 60 * 1000,
                });
                return res.json({
                    state: true,
                    message: '토큰이 성공적으로 발급되었습니다',
                });
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
        route: '/auth/refresh',
        handler: async (req, res) => {
            const { cookies } = req;
            const token = cookies.refresh_token;
            if (!token) {
                return res.status(401).json({ message: '로그인 후 이용해주세요' });
            }
            const params = new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: token,
                client_id: CLIENT_ID,
            }).toString();
            try {
                const data = await callSpotifyApi(`${BASE_URL_AUTH}/api/token`, {
                    method: 'POST',
                    token: BASIC_AUTH,
                    data: params,
                    auth: true,
                });

                const { access_token } = data;
                res.cookie('access_token', access_token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 1000,
                });
                return res.json({ state: true, message: '액세스 토큰이 성공적으로 재발급 되었습니다' });
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
        route: '/logout',
        handler: (req, res) => {
            const { cookies } = req;
            const token = cookies.refresh_token;
            if (!token) {
                return res.status(200).json({ message: '이미 로그아웃된 상태입니다' });
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
