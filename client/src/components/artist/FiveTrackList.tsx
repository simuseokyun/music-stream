import TrackItem from './FiveTrackItem';
import usePlayThrottle from '../../hooks/player/usePlayThrottle';
import useGetArtistTrack from '../../hooks/track/useGetArtistTrack';
import useThrottledToast from '../../hooks/common/useTrottledToast';
import usePlayTrack from '../../hooks/player/usePlayTrack';
export default function TrackList({ artistId }: { artistId?: string }) {
    const { data, isLoading, isError } = useGetArtistTrack(`/${artistId}`);
    const { playTrack } = usePlayTrack();
    const toast = useThrottledToast();
    const onPlay = usePlayThrottle(async ({ id }: { id: string }) => {
        const list = data?.tracks ?? [];
        if (!list) {
            toast('error', '곡을 재생할 수 없습니다');
            return;
        }
        const index = list.findIndex((item) => item.id === id);
        const newList = list.slice(0, 5).map(({ id, name, album }) => ({
            id,
            title: name,
            artist: album?.artists[0]?.name,
            image: album?.images[0]?.url,
        }));
        playTrack(index, newList);
    });

    if (isLoading) {
        return null;
    }
    if (isError || !data?.tracks.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center mt-20">곡 목록을 불러올 수 없습니다</h1>
            </div>
        );
    }
    const { tracks } = data;
    return (
        <table className="w-full table-fixed mt-2">
            <tbody>
                {tracks?.slice(0, 5).map((track) => <TrackItem key={track?.id} track={track} onPlay={onPlay} />)}
            </tbody>
        </table>
    );
}
