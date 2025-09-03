import AlbumItem from './AlbumItem';
import useGetArtistAlbums from '../../hooks/album/useArtistAlbums';
import { useViewportStore } from '../../store/common';

export default function AlbumList({ artistId }: { artistId?: string }) {
    const { data, isLoading, isError } = useGetArtistAlbums(`/${artistId}`);
    const isMobile = useViewportStore((state) => state.isMobile);
    if (isLoading) {
        return null;
    }
    if (isError || !data?.items?.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center mt-20">목록을 불러올 수 없습니다</h1>
            </div>
        );
    }

    const albumList = data?.items.slice(0, isMobile ? 6 : 4);

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 ">
            {albumList?.map((album) => <AlbumItem key={album.id} album={album} />)}
        </div>
    );
}
