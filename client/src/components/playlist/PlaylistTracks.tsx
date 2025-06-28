import useGetPlaylist from '../../hooks/playlist/useGetPlaylist';
import PlaylistTrackItem from './PlaylistTrackItem';
import usePlayThrottle from '../../hooks/player/usePlayThrottle';
import { TrackToPlay } from '../../types/models/player.';
import usePlayPreview from '../../hooks/player/usePlayPreview';
import { useCurrentPlaylistStore } from '../../store/player';
export default function PlaylistTracks({ playlistId }: { playlistId?: string }) {
    const { data, isLoading, isError, ref } = useGetPlaylist(playlistId);
    const { playPreview } = usePlayPreview();
    const { setPlaylist, setIndex } = useCurrentPlaylistStore();
    const onPlay = usePlayThrottle(({ id, title, artist, image }: TrackToPlay) => {
        const list = data?.pages.flatMap((page) => page?.items) ?? [];
        if (list) {
            const index = list.findIndex((item) => item.track.id === id);
            const newList = list.map(({ track }) => ({
                id: track.id,
                title: track.name,
                artist: track.album.artists[0].name,
                image: track.album.images[0].url,
            }));
            setPlaylist([...newList]);
            setIndex(index);
        }
        playPreview({ id, title, artist, image });
    }, 1000);

    if (isLoading) return null;
    if (isError)
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">데이터를 불러올 수 없습니다</h1>
            </div>
        );

    return (
        <>
            <table className="w-table-auto w-full table-fixed mt-2">
                <tbody>
                    {data?.pages.map((page) =>
                        page?.items.map(({ track }, index) => (
                            <PlaylistTrackItem
                                key={track.id + index}
                                track={track}
                                playlistId={playlistId as string}
                                onPlay={onPlay}
                            />
                        ))
                    )}
                </tbody>
            </table>
            <div ref={ref} className="h-[10px]" />
            {!data?.pages[0].items.length && <h1 className="text-center font-bold mt-10">곡을 추가해주세요</h1>}
        </>
    );
}
