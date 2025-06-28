import { axiosWithAuth } from '../api/client';
const getPlaylists = async ({ pageParam = 0 }: { pageParam: number }) => {
    return await axiosWithAuth(`/api/me/playlists?cursor=${pageParam}`);
};
const getPlaylist = async ({ id, pageParam = 0 }: { id: string; pageParam: number }) => {
    return await axiosWithAuth(`/api/me/playlist/${id}?cursor=${pageParam}`);
};
const getPlaylistInfo = async (playlistId: string) => {
    return await axiosWithAuth(`/api/me/playlist/info/${playlistId}`);
};

export { getPlaylists, getPlaylist, getPlaylistInfo };
