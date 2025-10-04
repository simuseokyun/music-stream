export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
export const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';
export const REDIRECT_URI = process.env.REDIRECT_URI || '';
export const BASE_URL_AUTH = 'https://accounts.spotify.com';
export const BASE_URL_API = 'https://api.spotify.com';
export const BASIC_AUTH = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
