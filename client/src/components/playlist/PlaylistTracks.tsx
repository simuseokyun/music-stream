import TrackItem from './PlaylistTrackItem';
import Loading from '../common/Loading';
import usePlayTrack from '../../hooks/player/usePlayTrack';
import useGetPlaylist from '../../hooks/playlist/useGetPlaylist';
import usePlayThrottle from '../../hooks/player/usePlayThrottle';
import useThrottledToast from '../../hooks/common/useTrottledToast';

export default function TrackList({ playlistId }: { playlistId?: string }) {
    const { data, isLoading, isError, error, isFetchingNextPage, ref } = useGetPlaylist(playlistId);
    const { playTrack } = usePlayTrack();
    const toast = useThrottledToast();
    const onPlay = usePlayThrottle(async ({ id }: { id: string }) => {
        const list = data?.pages.flatMap((page) => page?.items) ?? [];
        if (!list) {
            toast('error', '곡을 재생할 수 없습니다');
            return;
        }
        const index = list.findIndex((item) => item?.track.id === id);
        const newList = list.map(({ track: { id, name, album } }) => ({
            id,
            title: name,
            artist: album.artists[0]?.name,
            image: album?.images[0]?.url,
        }));
        playTrack(index, newList);
    });

    if (isLoading) return null;
    if (isError)
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">{error?.message}</h1>
            </div>
        );

    return (
        <div className="mt-2">
            <table className="w-full table-fixed ">
                <tbody>
                    {data?.pages.map((page) =>
                        page?.items.map(({ track }, index) => (
                            <TrackItem
                                key={track.id + index}
                                track={track}
                                playlistId={playlistId as string}
                                onPlay={onPlay}
                            />
                        ))
                    )}
                </tbody>
            </table>
            {isFetchingNextPage && <Loading />}
            {!data?.pages[0].items.length && <h1 className="text-center font-bold mt-10">곡을 추가해주세요</h1>}
            <div ref={ref} />
        </div>
    );
}
