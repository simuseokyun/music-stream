import { TrackItem } from './SearchTrackItem';
import Loading from '../common/Loading';
import usePlayThrottle from '../../hooks/player/usePlayThrottle';
import useGetSearchResult from '../../hooks/searchResult/useGetSearchResult';
import useThrottledToast from '../../hooks/common/useTrottledToast';
import usePlayTrack from '../../hooks/player/usePlayTrack';

function TracksResult() {
    const { data, isLoading, isError, error, isFetchingNextPage, ref } = useGetSearchResult();
    const { playTrack } = usePlayTrack();
    const toast = useThrottledToast();
    const onPlay = usePlayThrottle(async ({ id }: { id: string }) => {
        const list = data?.pages.flatMap((page) => page?.tracks?.items) ?? [];
        if (!list) {
            toast('error', '곡을 재생할 수 없습니다');
            return;
        }
        const index = list.findIndex((item) => item.id === id);
        const newList = list.map(({ id, name, album }) => ({
            id,
            title: name,
            artist: album.artists[0]?.name,
            image: album?.images[0]?.url,
        }));
        playTrack(index, newList);
    });

    if (isLoading) {
        return null;
    }
    if (isError) {
        return (
            <div className="flex-1">
                <h1 className="text-center mt-20">{error?.message}</h1>
            </div>
        );
    }
    if (!data?.pages[0]?.tracks?.items.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center mt-20">검색결과가 존재하지 않습니다</h1>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <table className="w-full table-fixed">
                <tbody>
                    {data?.pages.map((page) =>
                        page?.tracks?.items.map((track) => <TrackItem key={track.id} track={track} onPlay={onPlay} />)
                    )}
                </tbody>
            </table>
            {isFetchingNextPage && <Loading />}
            <div ref={ref} />
        </div>
    );
}

export default TracksResult;
