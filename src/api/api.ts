import Cookies from 'js-cookie';
import { IAllAlbums, IArtistAlbumInfo } from '../types/albumInfo';
import { getLocalStorage } from '../utils/util';

const client_id = process.env.REACT_APP_CLIENT_ID || '';
const client_secret = process.env.REACT_APP_SECRET_ID || '';
const redirect_uri = process.env.REACT_APP_REDIRECT_URI || '';

export const getWebToken = async () => {
    let access_token = getLocalStorage('webAccessToken');
    let expires_in = getLocalStorage('webExpiration');
    const now = new Date();
    const nowTimeNumber = now.getTime();
    if (access_token && expires_in && parseInt(expires_in, 10) - 10 > nowTimeNumber) {
        return { access_token, expires_in };
    }
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id,
            client_secret,
        }),
    });
    if (!response.ok) {
        throw new Error('failed');
    }
    const json = await response.json();
    const newWebToken = json.access_token;
    const nowTime = new Date();
    const expirationTime = nowTime.getTime() + json.expires_in * 1000;
    const newExpiration = expirationTime.toString();
    return { access_token: newWebToken, expires_in: newExpiration };
};

export const getSdkToken = async (authCode: string) => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code: authCode,
            redirect_uri,
            grant_type: 'authorization_code',
            client_id,
            client_secret,
        }),
    });
    if (!response.ok) {
        throw new Error('failed');
    }
    const json = await response.json();
    return json;
};
export const refreshAccessToken = async () => {
    const token = Cookies.get('refreshToken') as string;
    const client_id = process.env.REACT_APP_CLIENT_ID || '';
    const client_secret = process.env.REACT_APP_SECRET_ID || '';
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: token,
            client_id: client_id,
            client_secret: client_secret,
        }),
    });
    if (!response.ok) {
        throw new Error('failed');
    }
    const json = await response.json();
    return json;
};

const fetchHelper = async (url: string, token: string) => {
    const makeRequest = async (token: string) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    };
    let response = await makeRequest(token);
    if (response.status === 401) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.message === 'The access token expired') {
            const newTokenData = await getWebToken();
            response = await makeRequest(newTokenData.access_token);
        }
    }
    if (!response.ok && response.status !== 401) {
        throw new Error('failed');
    }
    const json = await response.json();
    return json;
};

export const getArtist = async (token: string, artistId: string) => {
    return await fetchHelper(`https://api.spotify.com/v1/artists/${artistId}`, token);
};

export const searchTrack = async (token: string, searchValue: string) => {
    if (searchValue) {
        return await fetchHelper(`https://api.spotify.com/v1/search?q=${searchValue}&type=track`, token);
    } else {
        return null;
    }
};
export const getAllAlbums = async (token: string, artistId: string) => {
    let allAlbums: IAllAlbums[] = [];
    let nextUrl: string | null = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`;
    while (nextUrl) {
        let response = await fetch(nextUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const newTokenData = await getWebToken();
            response = await fetch(nextUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${newTokenData.access_token}`,
                },
            });
        }
        const json: IArtistAlbumInfo = await response.json();
        allAlbums = [...allAlbums, ...json.items];
        nextUrl = json.next;
    }

    return allAlbums;
};
export const getFeaturePlaylist = async (token: string) => {
    return await fetchHelper(`https://api.spotify.com/v1/browse/featured-playlists`, token);
};
export const getNewAlbum = async (token: string) => {
    return await fetchHelper(`https://api.spotify.com/v1/browse/new-releases`, token);
};
export const getPopularPlaylist = async (token: string, playlistId: string) => {
    return await fetchHelper(`https://api.spotify.com/v1/playlists/${playlistId}`, token);
};

export const getAlbum = async (token: string, albumId: string) => {
    return await fetchHelper(`https://api.spotify.com/v1/albums/${albumId}`, token);
};
export const getArtistAlbum = async (token: string, artistId: string) => {
    return await fetchHelper(`https://api.spotify.com/v1/artists/${artistId}/albums`, token);
};
export const getArtistTopTrack = async (token: string, artistId: string) => {
    return await fetchHelper(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, token);
};
