import { getDataWithAuth } from '../api/client';

const getFollowingArtists = () => {
    return getDataWithAuth(`/api/me/artists`);
};
const checkArtistFollow = (artistId: string) => {
    return getDataWithAuth(`/api/me/artists/check?id=${artistId}`);
};
const artistFollow = (artistId: string) => {
    return getDataWithAuth(`/api/me/artists/follow`, {
        method: 'PUT',
        data: { ids: artistId },
    });
};
const artistUnfollow = (artistId: string) => {
    return getDataWithAuth(`/api/me/artists/unfollow`, {
        method: 'DELETE',
        data: { ids: artistId },
    });
};

export { getFollowingArtists, checkArtistFollow, artistFollow, artistUnfollow };
