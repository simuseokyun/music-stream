import { TrackToPlay } from '../../types/models/player.';
import TrackItem from './FiveTrackItem';
import usePlayPreview from '../../hooks/player/usePlayPreview';
import usePlayThrottle from '../../hooks/player/usePlayThrottle';
import useGetArtistTrack from '../../hooks/track/useGetArtistTrack';
import { useCurrentPlaylistStore } from '../../store/player';
import useThrottledToast from '../../hooks/common/useTrottledToast';
export default function TrackList({ artistId }: { artistId?: string }) {
    const toast = useThrottledToast();
    const { setPlaylist, setIndex } = useCurrentPlaylistStore();
    const { playPreview } = usePlayPreview();
    const { data, isLoading, isError } = useGetArtistTrack(artistId);
    const onPlay = usePlayThrottle(async ({ id, title, artist, image }: TrackToPlay) => {
        const list = data?.tracks.length ? data.tracks : null;
        try {
            if (list) {
                const index = list.findIndex((item) => item.id === id);
                const newList = list.slice(0, 5).map(({ id, name, artists, album }) => ({
                    id,
                    title: name,
                    artist: artists[0].name,
                    image: album?.images[0]?.url,
                }));
                const result = await playPreview({ id, title, artist, image });
                if (!result.success) {
                }
                setPlaylist([...newList]);
                setIndex(index);
            } else {
                toast('error', '재생할 곡이 없습니다', id);
            }
        } catch (error) {}
    });
    if (isLoading) {
        return null;
    }
    if (isError || !data?.tracks.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">곡을 찾을 수 없습니다</h1>
            </div>
        );
    }
    const { tracks } = data;
    return (
        <table className="w-table-auto w-full table-fixed">
            <tbody>
                {tracks?.slice(0, 5).map((track) => <TrackItem key={track.id} track={track} onPlay={onPlay} />)}
            </tbody>
        </table>
    );
}
