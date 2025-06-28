import PlaylistItem from './MyPlaylistItem';
import Loading from '../common/Loading';
import { useSortTabStore } from '../../store/library';
import { useGetPlaylists } from '../../hooks/playlist/useGetPlaylists';

export default function MyPlaylistList() {
    const sortState = useSortTabStore((state) => state.active);
    const { data, isLoading, isError, isFetchingNextPage, ref } = useGetPlaylists();
    if (isLoading) {
        return <Loading />;
    }
    if (isError || !data) {
        return (
            <div className="w-full">
                <h1 className="text-center m-20">데이터를 불러올 수 없습니다</h1>
            </div>
        );
    }

    return (
        <>
            <ul className={`w-full ${sortState === 'grid' ? 'grid grid-cols-3 lg:grid-cols-4' : ''}  mt-[10px]`}>
                {data?.pages.map((page) =>
                    page?.items.map((item) => {
                        return <PlaylistItem key={item.id} playlist={item} sortState={sortState} />;
                    })
                )}
            </ul>
            {isFetchingNextPage && <Loading />}
            <div ref={ref} className="h-[10px]" />
        </>
    );
}
