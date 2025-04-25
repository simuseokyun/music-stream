import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import spotifyPreviewFinder from 'spotify-preview-finder';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(
    cors({
        origin: ['http://localhost:3000'], // ✅ 클라이언트 주소 정확히 지정
        credentials: true, // ✅ 쿠키 주고받기 허용
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/preview', async (req, res) => {
    const { title } = req.query;
    try {
        const result = await spotifyPreviewFinder(title, 3);
        if (result.success) {
            res.status(200).json(result.results);
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/token', async (req, res) => {
    console.log(1);
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // application/x-www-form-urlencoded은 쿼리스트링으로 보내는 방식
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
            }),
        });

        const json = await response.json();
        console.log(json);
        const accessToken = json.access_token;
        const expiresIn = json.expires_in;

        res.cookie('spotify_token', accessToken, {
            httpOnly: true,
            maxAge: expiresIn * 1000,
            secure: true,
            sameSite: 'strict',
        });

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Token fetch failed' });
    }
});
app.get('/api/newAlbum', async (req, res) => {
    console.log(`쿼리는`, req.cookies[spotify_token]);
    // try {
    //     const result = await spotifyPreviewFinder(id);
    //     if (result.success) {
    //         res.status(200).json(result.results);
    //     } else {
    //         res.status(500).json({ error: result.error });
    //     }
    // } catch (err) {
    //     res.status(500).json({ error: err.message });
    // }
});

app.listen({ port: 8000 }, () => {
    console.log('Server is running on port 8000');
});
