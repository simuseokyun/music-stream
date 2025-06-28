import Loading from '../../components/common/Loading';
import AlbumItem from '../../components/allAlbum/AlbumItem';
import useGetAllAlbums from '../../hooks/album/useGetAllAlbums';

export default function AllAlbum() {
    const { data, isLoading, isError, isFetchingNextPage, ref } = useGetAllAlbums();

    if (isLoading) {
        return <Loading />;
    }
    if (isError || !data?.pages[0].items.length) {
        return (
            <div className="flex-1 mt-20">
                <h1 className="text-center">앨범 데이터를 불러올 수 없습니다</h1>
            </div>
        );
    }

    const { artists } = data?.pages[0]?.items[0];

    return (
        <div className="flex-1 rounded-md">
            <h1 className="text-2xl font-bold mb-[10px]">{artists[0]?.name || ''} 의 모든앨범</h1>
            <ul className="grid grid-cols-3 md:grid-cols-4">
                {data?.pages.map((page) => page?.items.map((album) => <AlbumItem key={album.id} album={album} />))}
            </ul>
            {isFetchingNextPage && <Loading />}
            <div ref={ref} className="h-[10px]" />
        </div>
    );
}
