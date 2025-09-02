import { AddPlaylistForm } from '../../types/models/playlist';
import { getDataWithAuth } from '../api/client';
const getPlaylists = ({ pageParam = 0 }: { pageParam: number }) => {
    return getDataWithAuth(`${import.meta.env.VITE_API_URL}/api/me/playlists?cursor=${pageParam}`);
};
const getPlaylist = ({ id, pageParam = 0 }: { id: string; pageParam: number }) => {
    return getDataWithAuth(`${import.meta.env.VITE_API_URL}/api/me/playlist/${id}?cursor=${pageParam}`);
};
const getPlaylistInfo = (playlistId: string) => {
    return getDataWithAuth(`${import.meta.env.VITE_API_URL}/api/me/playlist/info/${playlistId}`);
};
const createPlaylist = (data: AddPlaylistForm) => {
    return getDataWithAuth(`${import.meta.env.VITE_API_URL}/api/me/playlist/add`, {
        method: 'post',
        data,
    });
};
const deletePlaylist = (playlistId: string) => {
    return getDataWithAuth(`${import.meta.env.VITE_API_URL}/api/me/playlist/delete/${playlistId}`, {
        method: 'delete',
    });
};

export { getPlaylists, getPlaylist, getPlaylistInfo, createPlaylist, deletePlaylist };
