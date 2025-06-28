import { axiosWithoutAuth } from '../api/client';
const getSearchTracks = async (searchValue: string, pageParam: number) => {
    return axiosWithoutAuth(`/v1/search?q=${searchValue}&type=track,artist&offset=${pageParam}`);
};
export default getSearchTracks;
