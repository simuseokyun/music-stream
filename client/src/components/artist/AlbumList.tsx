import AlbumItem from './AlbumItem';
import useGetArtistAlbums from '../../hooks/album/useArtistAlbums';
import { useViewportStore } from '../../store/common';

export default function AlbumList({ artistId }: { artistId?: string }) {
    const { data, isLoading, isError } = useGetArtistAlbums(artistId);
    const isMobile = useViewportStore((state) => state.isMobile);
    if (isLoading) {
        return null;
    }
    if (isError || !data) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">앨범을 찾을 수 없습니다</h1>
            </div>
        );
    }
    const albumList = data?.items.slice(0, isMobile ? 6 : 4);
    return (
        <div className="grid grid-cols-3 md:grid-cols-4 ">
            {albumList?.map((item) => <AlbumItem key={item.id} album={item} />)}
        </div>
    );
}
