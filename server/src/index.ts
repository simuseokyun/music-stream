import dotenv from 'dotenv';
import path from 'path';

const envPath =
    process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '../.env.production') // dist에서 한 단계 위로
        : path.resolve(__dirname, '../.env.development');

dotenv.config({ path: envPath });

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
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log(process.env.A);
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
    console.log(`[Express] Route registered: [${method.toUpperCase()}] ${route}`);
});
console.log(__dirname);
if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, '../../client/dist');
    app.use(express.static(clientDistPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
    });
} else {
    console.log('개발 모드: React dev server를 통해 API 호출');
}

export const errorMessages: ErrorMessages = {
    401: '잘못된 토큰 또는 만료된 토큰입니다. 사용자를 다시 인증해주세요',
    403: '잘못된 요청입니다. 사용자를 재인증해도 이 요청은 실행되지 않습니다',
    429: '앱이 속도 제한을 초과하였습니다. 잠시 후 다시 시도해주세요',
    500: '네트워크 에러입니다',
};

app.listen(8000, '0.0.0.0', () => {
    console.log('서버 실행: http://0.0.0.0:8000');
});
