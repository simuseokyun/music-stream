import { axiosWithoutAuth } from '../api/client';

const getArtist = async (artistId: string) => {
    return axiosWithoutAuth(`/v1/artists/${artistId}`);
};
const getArtistTopTrack = async (artistId: string) => {
    return axiosWithoutAuth(`/v1/artists/${artistId}/top-tracks`);
};

export { getArtist, getArtistTopTrack };
