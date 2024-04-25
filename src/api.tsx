const CLIENT_ID = '9b1aa9c5e93a407f8a2253ef5cd7b2c4';
const SECRET_ID = '8eef047b0dbb405b9a0236ba1d01a10e';

// const clientId = process.env.CLIENT_ID || '';
// const clientSecret = process.env.SECRET_ID || '';

export const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: SECRET_ID,
        }),
    });
    const json = await response.json();
    return json;
};
export const getToken2 = async (code: string) => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code: code,
            redirect_uri: 'http://localhost:3000/home',
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: SECRET_ID,
        }),
    });
    const json = await response.json();
    console.log(json);
    return json;
};
export const player = async (token: string, trackUri?: string) => {
    const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uris: ['spotify:track:1TiZWEsxN85yLJBq56K8mG'],
        }),
    });
    const json = await response.json();
    return json;
};

export const getArtist = async (token: string, artistId: string) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    return json;
};

export const searchTrack = async (token: string, search: string) => {
    const searchValue = search ? search : 'drake';
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchValue}&type=track`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    return json;
};

export const searchAlbum = async (token: string, search?: string) => {
    const response = await fetch(`https://api.spotify.com/v1/albums/1ATL5GLyefJaxhQzSPVrLX`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    return json;
};
export const getFeaturePlaylist = async (token: string) => {
    const response = await fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    return json;
};
export const getPopularPlaylist = async (token: string, playlistId: string) => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    return json;
};

export const getAlbum = async (token: string, albumId: string) => {
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    return json;
};

export const getNewAlbum = async (token: string) => {
    const response = await fetch(`https://api.spotify.com/v1/browse/new-releases`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    return json;
};
export const getArtistAlbum = async (token: string, artistId: string) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    return json;
};
export const getArtistTopTrack = async (token: string, artistId: string) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    return json;
};

export const msTransform = (ms: number) => {
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return { minutes, seconds };
};
export const commaSeparate = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
