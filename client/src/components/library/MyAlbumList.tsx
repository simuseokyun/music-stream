import MyAlbumItem from './MyAlbumItem';
import { useSortTabStore } from '../../store/library';
import Loading from '../common/Loading';
import useGetMyAlbums from '../../hooks/album/useGetMyAlbums';

export default function MyAlbumList() {
    const sortState = useSortTabStore((state) => state.active);
    const { data, isLoading, isError, isFetchingNextPage, ref } = useGetMyAlbums();
    if (isLoading) {
        return <Loading />;
    }
    if (isError || !data?.pages[0].items.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">앨범 목록을 불러 올 수 없습니다</h1>
            </div>
        );
    }

    return (
        <>
            <ul className={`w-full ${sortState === 'grid' ? 'grid grid-cols-3 lg:grid-cols-4' : ''}  mt-[10px]`}>
                {data?.pages.map((page) =>
                    page?.items.map(({ album }) => <MyAlbumItem key={album.id} album={album} />)
                )}
            </ul>
            {isFetchingNextPage && <Loading />}
            <div ref={ref} className="h-[10px]" />
        </>
    );
}
