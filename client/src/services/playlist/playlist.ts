import { fetchWithAuth } from '../api/client';
const getPlaylists = async ({ pageParam = 0 }: { pageParam: number }) => {
    return await fetchWithAuth(`/api/me/playlists?cursor=${pageParam}`);
};
export default getPlaylists;
