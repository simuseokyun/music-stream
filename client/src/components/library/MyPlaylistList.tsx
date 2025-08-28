import PlaylistItem from './MyPlaylistItem';
import Loading from '../common/Loading';
import { useGetPlaylists } from '../../hooks/playlist/useGetPlaylists';
import { useSortTabStore } from '../../store/library';

export default function PlaylistList() {
    const { data, isLoading, isError, isFetchingNextPage, ref } = useGetPlaylists();
    const sortState = useSortTabStore((state) => state.active);

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return (
            <div className="w-full">
                <h1 className="text-center m-20">데이터를 불러올 수 없습니다</h1>
            </div>
        );
    }
    if (!data?.pages[0]?.items.length)
        return (
            <div className="w-full">
                <h1 className="text-center m-20">플레이리스트를 생성해주세요</h1>
            </div>
        );
    return (
        <>
            <ul className={`w-full mt-2 ${sortState === 'grid' ? 'grid grid-cols-3 lg:grid-cols-4' : ''} `}>
                {data?.pages.map((page) =>
                    page?.items.map((playlist) => {
                        return <PlaylistItem key={playlist.id} playlist={playlist} sortState={sortState} />;
                    })
                )}
            </ul>
            {isFetchingNextPage && <Loading />}
            <div ref={ref} />
        </>
    );
}
