import { getDataWithAuth } from '../api/client';

const getFollowingAlbums = ({ pageParam = 0 }: { pageParam: number }) => {
    return getDataWithAuth(`/api/me/albums?cursor=${pageParam}`);
};

const checkAlbumLike = (albumId: string) => {
    return getDataWithAuth(`/api/me/albums/check?id=${albumId}`);
};
const addAlbum = (albumId: string) => {
    return getDataWithAuth(`/api/me/albums/add`, {
        method: 'put',
        data: { ids: [albumId] },
    });
};
const deleteAlbum = (albumId: string) => {
    return getDataWithAuth(`/api/me/albums/delete`, {
        method: 'delete',
        data: { ids: [albumId] },
    });
};

export { getFollowingAlbums, checkAlbumLike, addAlbum, deleteAlbum };
