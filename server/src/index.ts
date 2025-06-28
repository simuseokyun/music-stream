import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import albumRoute from './routes/album';
import authRoute from './routes/auth';
import playerRoute from './routes/player';
import { playlistRoute } from './routes/playlist';
import userRoute from './routes/user';
import { CustomRoute } from './types';
import { errorMessage } from './types';

const app = express();
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

export const errorMessages: errorMessage = {
    401: '잘못된 토큰 또는 만료된 토큰입니다. 사용자를 다시 인증해주세요',
    403: '잘못된 요청입니다. 사용자를 재인증해도 이 요청은 실행되지 않습니다',
    429: '앱이 속도 제한을 초과하였습니다.',
};

const routes: CustomRoute[] = [...userRoute, ...authRoute, ...playerRoute, ...playlistRoute, ...albumRoute];

routes.forEach(({ method, route, handler }) => {
    app[method](route, handler);
});

app.listen({ port: 8000 }, () => {
    console.log('포트:8000 에서 서버 실행중...');
});

// app.get('/api/webToken', async (req: Request, res: Response) => {
//     try {
//         const params = new URLSearchParams();
//         params.append('grant_type', 'client_credentials');
//         params.append('client_id', client_id);
//         params.append('client_secret', client_secret);
//         const response = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         });
//         const data = response.data;
//         return res.json(data);
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Spotify token fetch error:', error.response?.data || error.message);
//             return res.status(500).json({ error: 'Failed to fetch Spotify token' });
//         } else if (error instanceof Error) {
//             // 일반적인 Error 타입일 때
//             console.error('Spotify token fetch error:', error.message);
//             return res.status(500).json({ error: 'Failed to fetch Spotify token' });
//         } else {
//             // 그 외 예외
//             console.error('Spotify token fetch unknown error:', error);
//             return res.status(500).json({ error: 'Failed to fetch Spotify token' });
//         }
//     }
// });
// app.post('/api/preview', async (req, res) => {
//     const { title } = req.query;
//     const { id } = req.body;
//     console.log(title);
//     try {
//         const result = await spotifyPreviewFinder(title as string, 50);
//         const songInfo = result?.results.find((track: any) => {
//             const urlParts = track.spotifyUrl.split('/');
//             const trackId = urlParts[urlParts.length - 1];
//             return id === trackId;
//         });
//         console.log(songInfo);
//         if (!songInfo) return res.status(403).json({ error: '해당 곡은 재생할 수 없습니다' });
//         if (result.success) {
//             return res.json([{ ...songInfo }]);
//         } else {
//             throw new Error('에러');
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Spotify token fetch error:', error.response?.data || error.message);
//             return res.status(500).json({ error: 'Failed to fetch Spotify token' });
//         } else if (error instanceof Error) {
//             console.error('Spotify token fetch error:', error.message);
//             return res.status(500).json({ error: 'Failed to fetch Spotify token' });
//         } else {
//             console.error('Spotify token fetch unknown error:', error);
//             return res.status(500).json({ error: 'Failed to fetch Spotify token' });
//         }
//     }
// });

// app.post('/api/auth/token', async (req, res) => {
//     const params = new URLSearchParams();
//     params.append('code', req.body.code);
//     params.append('redirect_uri', redirect_uri || '');
//     params.append('grant_type', 'authorization_code');
//     params.append('client_id', client_id);
//     params.append('client_secret', client_secret);
//     const response = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     });
//     const data = response.data;
//     // 액세스 토큰과 리프레시 토큰 확인
//     const { access_token, refresh_token } = data;
//     res.cookie('access_token', access_token, {
//         httpOnly: true, // 클라이언트 측에서 접근 불가
//         secure: false, // 프로덕션 환경에서는 true로 설정
//         sameSite: 'lax', // 타사 쿠키 사용 허용 (CORS를 사용할 때 필요)
//         maxAge: 3600 * 1000, // 쿠키 만료 시간 (1시간)
//     });
//     res.cookie('refresh_token', refresh_token, {
//         httpOnly: true,
//         secure: false, // 배포시 true로 변경
//         sameSite: 'lax',
//         maxAge: 30 * 24 * 60 * 60 * 1000, // 예: 30일
//     });

//     // 토큰을 클라이언트로 응답
//     return res.json({
//         loginSuccess: true,
//     });
// });
// interface TokenResponse {
//     [key: string]: any; // 기타 속성도 있을 수 있음
// }
// app.post('/api/auth/refresh', async (req, res) => {
//     const refresh_token = req.cookies.refresh_token;
//     console.log(refresh_token);
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             Authorization: `Basic ${basicAuth}`,
//         },
//         body: new URLSearchParams({
//             grant_type: 'refresh_token',
//             refresh_token,
//             client_id,
//         }),
//     });

//     const data: TokenResponse = await response.json();
//     const accessToken = data.access_token;
//     res.cookie('access_token', accessToken, {
//         httpOnly: true,
//         secure: false, // 프로덕션 환경에서는 true로 설정
//         sameSite: 'lax',
//         maxAge: 3600 * 1000,
//     });
//     if (data.refresh_token) {
//         res.cookie('refresh_token', data.refresh_token, {
//             httpOnly: true,
//             secure: false, // 프로덕션 환경에서는 true로 설정
//             sameSite: 'lax',
//             maxAge: 3600 * 1000,
//         });
//     }
//     if (!response.ok) {
//         return res.status(response.status).json({
//             status: false,
//             message: data.error_description || 'Failed to refresh access token',
//         });
//     }
//     return res.json({
//         status: true,
//     });
// });
// app.get('/api/me', async (req, res) => {
//     const accessToken = req.cookies.access_token;
//     const refreshToken = req.cookies.refresh_token;
//     if (!refreshToken) {
//         return res.status(401).json({ success: false, message: '로그인이 필요합니다' });
//     }
//     try {
//         const response = await fetch('https://api.spotify.com/v1/me', {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//         if (!response.ok) {
//             const message = errorMessages[response.status] || '알 수 없는 오류가 발생했습니다.';
//             return res.status(response.status).json({
//                 success: false,
//                 message,
//             });
//         }
//         const data = await response.json();
//         return res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: '서버 에러입니다.' });
//     }
// });
// app.get('/api/me', async (req: Request, res: Response) => {
//     let accessToken = req.cookies.access_token;
//     const refreshToken = req.cookies.refresh_token;

//     if (!refreshToken) {
//         return res.status(401).json({ message: 'Refresh token 없음' });
//     }

//     // 1차 시도: 기존 accessToken으로 Spotify API 호출
//     let response = await fetch('https://api.spotify.com/v1/me', {
//         headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     if (response.ok) {
//         const data = await response.json();
//         return res.json(data);
//     }

//     // access token 만료 또는 실패
//     if (response.status === 401) {
//         // 새 access token 발급
//         const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: new URLSearchParams({
//                 grant_type: 'refresh_token',
//                 refresh_token: refreshToken,
//             }),
//         });

//         if (!tokenResponse.ok) {
//             return res.status(401).json({ message: '리프레시 토큰 만료' });
//         }

//         const tokenData = await tokenResponse.json();
//         accessToken = tokenData.access_token;

//         // 새 access token 쿠키로 저장
//         res.cookie('access_token', accessToken, {
//             httpOnly: true,
//             sameSite: 'lax',
//             secure: false,
//         });

//         // 새 token으로 다시 Spotify API 요청
//         response = await fetch('https://api.spotify.com/v1/me', {
//             headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return res.json(data);
//         }
//     }

//     return res.status(401).json({ message: '인증 실패' });
// });
// app.get('/api/me/playlists', async (req, res) => {
//     const offset = req.query.cursor;
//     const accessToken = req.cookies.access_token;
//     if (!accessToken) {
//         return res.status(401).json({ error: 'Access token is missing' });
//     }
//     try {
//         const response = await fetch(`https://api.spotify.com/v1/me/playlists?limit=10&offset=${offset}`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`, // access_token을 Authorization 헤더에 추가
//             },
//         });

//         if (!response.ok) {
//             const message = errorMessages[response.status] || '알 수 없는 오류가 발생했습니다.';
//             return res.status(response.status).json({
//                 success: false,
//                 message,
//             });
//         }
//         console.log(response);
//         const data = await response.json();

//         return res.json(data);
//     } catch (error) {
//         return res.status(500).json({ error: '서버 에러입니다.' });
//     }
// });
// app.get('/api/me/albums', async (req, res) => {
//     const offset = req.query.cursor;
//     const accessToken = req.cookies.access_token;

//     if (!accessToken) {
//         return res.status(401).json({ error: 'Access token is missing' });
//     }
//     try {
//         const response = await fetch(`https://api.spotify.com/v1/me/albums?limit=25&offset=${offset}`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//         if (!response.ok) {
//             const message = errorMessages[response.status] || '알 수 없는 오류가 발생했습니다.';
//             return res.status(response.status).json({
//                 success: false,
//                 message,
//             });
//         }
//         const data = await response.json();
//         const newData: any = data?.items.filter((a: any) => a !== null); // 알 수 없는 이유로 내부에 null 요소가 있어서 데이터 가공
//         return res.json({ ...data, items: newData });
//     } catch (error) {
//         return res.status(500).json({ error: '서버 에러입니다.' });
//     }
// });
// app.get(`/api/me/playlist/:id`, async (req, res) => {
//     const id = req.params.id;
//     const offset = req.query.cursor;
//     const accessToken = req.cookies.access_token;
//     if (!accessToken) {
//         return res.status(401).json({ error: 'Access token is missing' });
//     }

//     try {
//         const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?offset=${offset}`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`, // access_token을 Authorization 헤더에 추가
//             },
//         });
//         console.log(response);
//         // API 응답 상태 코드가 OK가 아닌 경우 에러 처리
//         if (!response.ok) {
//             return res.status(response.status).json({
//                 error: `Spotify API error: ${response.statusText}`,
//             });
//         }

//         const data = await response.json();

//         return res.json(data);
//     } catch (error) {
//         // 네트워크 오류나 다른 예외가 발생한 경우

//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/api/logout', (req, res) => {
//     const accessToken = req.cookies.access_token;
//     if (!accessToken) {
//         return res.status(401).json({ message: '이미 로그아웃된 상태입니다.' });
//     }
//     res.clearCookie('access_token', {
//         httpOnly: true,
//         sameSite: 'lax', // 클라이언트 세팅과 동일하게 맞추는 게 중요
//         secure: false, // https가 아니면 false
//     });
//     res.clearCookie('refresh_token', {
//         httpOnly: true,
//         sameSite: 'lax', // 클라이언트 세팅과 동일하게 맞추는 게 중요
//         secure: false, // https가 아니면 false
//     });
//     return res.json({ status: true, message: 'Logged out successfully' });
// });
// app.put('/api/me/albums/add', async (req, res) => {
//     const ids = req.body.ids;
//     console.log(ids);
//     const accessToken = req.cookies.access_token;
//     try {
//         const response = await fetch(`https://api.spotify.com/v1/me/albums`, {
//             method: 'put',
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ids: ids, // 앨범 ID 배열
//             }),
//         });

//         // API 응답 상태 코드가 OK가 아닌 경우 에러 처리
//         if (!response.ok) {
//             return res.status(response.status).json({
//                 error: `Spotify API error: ${response.statusText}`,
//             });
//         }

//         // 응답을 JSON으로 파싱하여 반환

//         // 클라이언트로 반환
//         return res.json({ message: '저장 완료' });
//     } catch (error) {
//         // 네트워크 오류나 다른 예외가 발생한 경우
//         console.error('Error fetching playlists:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });
// app.delete('/api/me/albums/delete', async (req, res) => {
//     const ids = req.body.ids;

//     const accessToken = req.cookies.access_token;
//     try {
//         const response = await fetch(`https://api.spotify.com/v1/me/albums`, {
//             method: 'delete',
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ids: ids, // 앨범 ID 배열
//             }),
//         });

//         // API 응답 상태 코드가 OK가 아닌 경우 에러 처리
//         if (!response.ok) {
//             return res.status(response.status).json({
//                 error: `Spotify API error: ${response.statusText}`,
//             });
//         }

//         // 응답을 JSON으로 파싱하여 반환

//         console.log(response);
//         // 클라이언트로 반환
//         return res.json({ message: '삭제 완료' });
//     } catch (error) {
//         // 네트워크 오류나 다른 예외가 발생한 경우
//         console.error('Error fetching playlists:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });
// app.get('/api/me/albums/check', async (req, res) => {
//     const accessToken = req.cookies.access_token;
//     console.log('입장', accessToken);
//     try {
//         const response = await fetch(`https://api.spotify.com/v1/me/albums/contains?ids=${req.query.id}`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//         console.log(response);

//         // API 응답 상태 코드가 OK가 아닌 경우 에러 처리

//         if (!response.ok) {
//             console.log('error');
//         }
//         const data = await response.json();
//         return res.json(data);
//     } catch (error) {
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });
// app.post('/api/me/playlist/track/add/:playlistId', async (req, res) => {
//     const accessToken = req.cookies.access_token;
//     const playlistId = req.params.playlistId;
//     const trackUri = req.body.trackUri;
//     console.log(trackUri);
//     const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//             uris: [trackUri],
//         }),
//     });
//     console.log(response);
//     if (!response.ok) {
//         return res.status(500).json({ error: '에러' });
//     }
//     const data = await response.json();
//     return res.json(data);
// });

// app.get('/api/me/playlist/info/:playlistId', async (req, res) => {
//     const accessToken = req.cookies.access_token;
//     const playlistId = req.params.playlistId;
//     const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });
//     if (!response.ok) {
//         console.log('error');
//     }
//     const data = await response.json();
//     return res.json(data);
// });
// app.delete('/api/me/playlist/track/delete/:playlistId', async (req, res) => {
//     const accessToken = req.cookies.access_token;
//     const playlistId = req.params.playlistId;
//     const trackUri = req.body.trackUri;
//     const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//         method: 'delete',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//             tracks: [{ uri: trackUri, position: 0 }],
//         }),
//     });

//     if (!response.ok) {
//         console.log('error');
//     }
//     const data = await response.json();
//     return res.json(data);
// });
// app.post('/api/me/playlist/add', async (req, res) => {
//     const accessToken = req.cookies.access_token;
//     const { name, description, user } = req.body;
//     const response = await fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json', // 수정된 문법
//             Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//             name,
//             description,
//             public: true,
//         }),
//     });
//     if (!response.ok) {
//         return res.status(500).json({ message: '에러입니다' });
//     }
//     const data = await response.json();
//     return res.json(data);
// });

// // const routes = [...playlistRoute];
// // routes.forEach(({ method, route, handler }) => {
// //     app[method](route, handler);
// // });
