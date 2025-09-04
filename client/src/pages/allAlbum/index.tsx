import Loading from '../../components/common/Loading';
import AlbumItem from '../../components/allAlbum/AlbumItem';
import useGetAllAlbums from '../../hooks/album/useGetAllAlbums';

export default function AllAlbum() {
    const { data, isLoading, isError, error, isFetchingNextPage, ref } = useGetAllAlbums();
    if (isLoading) {
        return <Loading />;
    }
    if (isError || !data?.pages[0].items.length) {
        return (
            <div className="flex-1 ">
                <h1 className="text-center mt-20">{error?.message}</h1>
            </div>
        );
    }
    const { artists } = data?.pages[0]?.items[0];

    return (
        <div className="flex-1">
            <h1 className="text-2xl font-bold mb-[10px]">{artists[0]?.name || ''} 의 모든앨범</h1>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 lg:gap-0">
                {data?.pages.map((page) => page?.items.map((album) => <AlbumItem key={album.id} album={album} />))}
            </ul>
            {isFetchingNextPage && <Loading />}
            <div ref={ref} />
        </div>
    );
}
