import Cookies from 'js-cookie';

export const getToken = async () => {
    const access_token = localStorage.getItem('webAccessToken');
    const expires_in = localStorage.getItem('webExpiration');
    const now = new Date();
    const nowTimeNumber = now.getTime();
    if (access_token && expires_in && parseInt(expires_in, 10) > nowTimeNumber) {
        return { access_token, expires_in };
    }
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.REACT_APP_CLIENT_ID || '',
            client_secret: process.env.REACT_APP_SECRET_ID || '',
        }),
    });
    const json = await response.json();
    const newToken = json.access_token;
    const newExpiration = (now.getTime() + 59 * 60 * 1000).toString();
    return { access_token: newToken, expires_in: newExpiration };
};

export const getSdkToken = async (code: string) => {
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI || '';
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_CLIENT_ID || '',
            client_secret: process.env.REACT_APP_SECRET_ID || '',
        }),
    });
    const json = await response.json();
    console.log(json);
    return json;
};
export const refreshToken = async () => {
    const token = Cookies.get('refreshToken') as string;
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: token,
            client_id: process.env.REACT_APP_CLIENT_ID || '',
            client_secret: process.env.REACT_APP_SECRET_ID || '',
        }),
    });
    const json = await response.json();
    console.log('리프레쉬 들렷다감', json);
    return json;
};

export const deviceId = async () => {
    const token = Cookies.get('accessToken');
    const response = await fetch('https://api.spotify.com/v1/me/player', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}}`,
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    return json;
};

const fetchWithToken = async (url: string, token: string) => {
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
            const newTokenData = await getToken();
            response = await makeRequest(newTokenData.access_token);
        }
    }
    if (!response.ok) {
        throw new Error('API 요청에 실패했습니다.');
    }

    const json = await response.json();
    return json;
};

export const getArtist = async (token: string, artistId: string) => {
    return await fetchWithToken(`https://api.spotify.com/v1/artists/${artistId}`, token);
};

export const searchTrack = async (token: string, search: string) => {
    if (search) {
        return await fetchWithToken(`https://api.spotify.com/v1/search?q=${search}&type=track`, token);
    } else {
        return null;
    }
};

export const getFeaturePlaylist = async (token: string) => {
    return await fetchWithToken(`https://api.spotify.com/v1/browse/featured-playlists`, token);
};
export const getPopularPlaylist = async (token: string, playlistId: string) => {
    return await fetchWithToken(`https://api.spotify.com/v1/playlists/${playlistId}`, token);
};

export const getAlbum = async (token: string, albumId: string) => {
    return await fetchWithToken(`https://api.spotify.com/v1/albums/${albumId}`, token);
};

export const getNewAlbum = async (token: string) => {
    return await fetchWithToken(`https://api.spotify.com/v1/browse/new-releases`, token);
};
export const getArtistAlbum = async (token: string, artistId: string) => {
    return await fetchWithToken(`https://api.spotify.com/v1/artists/${artistId}/albums`, token);
};
export const getArtistTopTrack = async (token: string, artistId: string) => {
    return await fetchWithToken(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, token);
};

interface AlbumResponse {
    items: { id: string; name: string; album_type: string; images: { url: string }[]; release_date: string }[];
    next: string;
}
interface IAlbum {
    id: string;
    name: string;
    album_type: string;
    images: { url: string }[];
    release_date: string;
}
export const getAllAlbums = async (token: string, artistId: string) => {
    let allAlbums: IAlbum[] = [];
    let nextUrl: string | null = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`;
    while (nextUrl) {
        let response = await fetch(nextUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // if (!response.ok) {
        //     const newTokenData = await getToken();
        //     let response = await fetch(nextUrl, {
        //         method: 'GET',
        //         headers: {
        //             Authorization: `Bearer ${newTokenData}`,
        //         },
        //     });
        // }
        console.log(response);
        const json: AlbumResponse = await response.json();
        allAlbums = [...allAlbums, ...json.items];
        nextUrl = json.next;
    }

    return allAlbums;
};

export const nowSong = async () => {
    const token = Cookies.get('accessToken');
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
    }
    const json = await response.json();
    return json;
};
