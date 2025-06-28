export const client_id = process.env.SPOTIFY_CLIENT_ID || '';
export const client_secret = process.env.SPOTIFY_CLIENT_SECRET || '';
export const redirect_uri = process.env.REDIRECT_URI || '';
export const baseUrl = process.env.BASE_URL || '';
export const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
