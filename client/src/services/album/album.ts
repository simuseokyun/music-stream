import { axiosWithAuth, axiosWithoutAuth } from '../api/client';

const getFollowingAlbums = async ({ pageParam = 0 }: { pageParam: number }) => {
    return axiosWithAuth(`/api/me/albums?cursor=${pageParam}`);
};
const getNewAlbum = async () => {
    return axiosWithoutAuth(`/v1/browse/new-releases`);
};
const getAlbum = async (albumId: string) => {
    return axiosWithoutAuth(`/v1/albums/${albumId}`);
};

const getArtistAlbum = async (artistId: string) => {
    return axiosWithoutAuth(`/v1/artists/${artistId}/albums`);
};
const getAllAlbum = async (artistId: string, pageParam: number) => {
    return axiosWithoutAuth(`/v1/artists/${artistId}/albums?include_groups=album,single&offset=${pageParam}`);
};

const checkAlbumLike = async (albumId: string) => {
    const data = await axiosWithAuth(`/api/me/albums/check?id=${albumId}`);
    return data;
};
const addAlbum = async (albumId: string) => {
    await axiosWithAuth(`/api/me/albums/add`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: { ids: [albumId] },
    });
};
const deleteAlbum = async (albumId: string) => {
    await axiosWithAuth(`/api/me/albums/delete`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        data: { ids: [albumId] },
    });
};

export {
    getFollowingAlbums,
    getNewAlbum,
    getAlbum,
    getArtistAlbum,
    getAllAlbum,
    checkAlbumLike,
    addAlbum,
    deleteAlbum,
};
