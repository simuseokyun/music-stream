import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV || 'development'}`),
});
console.log(process.env.SPOTIFY_CLIENT_ID);
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import albumRoute from './routes/album';
import authRoute from './routes/auth';
import playerRoute from './routes/player';
import { playlistRoute } from './routes/playlist';
import userRoute from './routes/user';
import { CustomRoute } from './types';
import { ErrorMessages } from './types';
import artistRoute from './routes/artist';

const app = express();
const allowedOrigin =
    process.env.NODE_ENV === 'production'
        ? 'http://ec2-3-34-190-12.ap-northeast-2.compute.amazonaws.com:8000'
        : 'http://localhost:3000';
app.use(
    cors({
        origin: allowedOrigin,
        credentials: true, // 쿠키 전송 허용
    })
);

console.log(process.env.NODE_ENV);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const routes: CustomRoute[] = [
    ...userRoute,
    ...authRoute,
    ...playerRoute,
    ...playlistRoute,
    ...albumRoute,
    ...artistRoute,
];

routes.forEach(({ method, route, handler }) => {
    app[method](route, handler);
});

if (process.env.NODE_ENV === 'production') {
    const clientPath = path.join(__dirname, '../../client/dist');
    app.use(express.static(clientPath));
    app.get('*', (_req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    });
} else {
    console.log('개발 모드');
}

export const errorMessages: ErrorMessages = {
    401: '잘못된 토큰 또는 만료된 토큰입니다. 사용자를 다시 인증해주세요',
    403: '잘못된 요청입니다. 사용자를 재인증해도 이 요청은 실행되지 않습니다',
    429: '앱이 속도 제한을 초과하였습니다. 잠시 후 다시 시도해주세요',
    500: '네트워크 에러입니다',
};

app.listen(8000, '0.0.0.0', () => {
    console.log('서버 실행');
});
