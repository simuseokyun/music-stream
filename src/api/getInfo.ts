import { fetchHelper } from './fetchHelper';

export const getArtist = async (token: string, artistId: string) => {
    return await fetchHelper(`https://api.spotify.com/v1/artists/${artistId}`, token);
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
export const getSearchResult = async (token: string, searchValue: string) => {
    if (searchValue) {
        return await fetchHelper(`https://api.spotify.com/v1/search?q=${searchValue}&type=track`, token);
    } else {
        return null;
    }
};
