import AlbumItem from './MyAlbumItem';
import Loading from '../common/Loading';
import useGetMyAlbums from '../../hooks/album/useGetMyAlbums';
import { useSortTabStore } from '../../store/library';

export default function AlbumList() {
    const { data, isLoading, isError, isFetchingNextPage, ref } = useGetMyAlbums();
    const sortState = useSortTabStore((state) => state.active);
    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">앨범 목록을 불러 올 수 없습니다</h1>
            </div>
        );
    }
    if (!data?.pages[0].items.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">찜한 앨범이 없습니다</h1>
            </div>
        );
    }

    return (
        <>
            <ul className={`w-full mt-2 ${sortState === 'grid' ? 'grid grid-cols-3 lg:grid-cols-4' : ''} `}>
                {data?.pages.map((page) => page?.items.map(({ album }) => <AlbumItem key={album.id} album={album} />))}
            </ul>
            {isFetchingNextPage && <Loading />}
            <div ref={ref} />
        </>
    );
}
