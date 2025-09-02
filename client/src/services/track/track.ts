import { getDataWithAuth } from '../api/client';

const deleteTrack = (playlistId: string, id: string) => {
    return getDataWithAuth(`/api/me/playlist/track/delete/${playlistId}`, {
        method: 'delete',
        data: { id },
    });
};
const addTrack = (playlistId: string, id: string) => {
    return getDataWithAuth(`/api/me/playlist/track/add/${playlistId}`, {
        method: 'post',
        data: { trackId: id },
    });
};

export { addTrack, deleteTrack };
