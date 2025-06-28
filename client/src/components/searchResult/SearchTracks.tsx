import { TrackItem } from './SearchTrackItem';
import Loading from '../common/Loading';
import usePlayPreview from '../../hooks/player/usePlayPreview';
import usePlayThrottle from '../../hooks/player/usePlayThrottle';
import { TrackToPlay } from '../../types/models/player.';
import useGetSearchResult from '../../hooks/searchResult/useGetSearchResult';
import { useCurrentPlaylistStore } from '../../store/player';

function TracksResult() {
    const { playPreview } = usePlayPreview();
    const { data, isLoading, isError, isFetchingNextPage, ref } = useGetSearchResult();
    const { setPlaylist, setIndex } = useCurrentPlaylistStore();
    const onPlay = usePlayThrottle(({ id, title, artist, image }: TrackToPlay) => {
        const list = data?.pages.flatMap((page) => page?.tracks?.items) ?? [];
        if (list) {
            const index = list.findIndex((item) => item.id === id);
            const newList = list.map((item) => ({
                id: item.id,
                title: item.name,
                artist: item.album.artists[0].name,
                image: item.album.images[0].url,
            }));
            setPlaylist([...newList]);
            setIndex(index);
        }
        playPreview({ id, title, artist, image });
    });

    if (isLoading) {
        return null;
    }
    if (isError || !data?.pages[0]?.tracks?.items.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center mt-20">트랙을 찾을 수 없습니다</h1>
            </div>
        );
    }

    return (
        <>
            <table className="w-table-auto w-full table-fixed">
                <tbody>
                    {data?.pages.map((page) =>
                        page?.tracks?.items.map((item) => <TrackItem key={item.id} track={item} onPlay={onPlay} />)
                    )}
                </tbody>
            </table>
            {isFetchingNextPage && <Loading />}
            <div ref={ref} className="h-[10px]" />
        </>
    );
}

export default TracksResult;
