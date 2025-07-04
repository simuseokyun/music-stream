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
import { ErrorMessages } from './types';

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

export const errorMessages: ErrorMessages = {
    400: '값이 누락되었거나 잘못된 값을 보냈습니다',
    401: '잘못된 토큰 또는 만료된 토큰입니다. 사용자를 다시 인증해주세요',
    403: '잘못된 요청입니다. 사용자를 재인증해도 이 요청은 실행되지 않습니다',
    429: '앱이 속도 제한을 초과하였습니다.',
    500: '네트워크 에러입니다.',
};

const routes: CustomRoute[] = [...userRoute, ...authRoute, ...playerRoute, ...playlistRoute, ...albumRoute];

routes.forEach(({ method, route, handler }) => {
    app[method](route, handler);
});

app.listen({ port: 8000 }, () => {
    console.log(`서버 실행: http://localhost8000`);
});
