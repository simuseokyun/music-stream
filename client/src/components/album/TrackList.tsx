import TrackItem from './TrackItem';
import useThrottledToast from '../../hooks/common/useTrottledToast';
import usePlayPreview from '../../hooks/player/usePlayPreview';
import { TrackToPlay } from '../../types/models/player.';
import usePlayThrottle from '../../hooks/player/usePlayThrottle';
import { AlbumDataResponse } from '../../types/api/album';
import { useCurrentPlaylistStore } from '../../store/player';

export default function TrackList({ data }: { data: AlbumDataResponse }) {
    const { setPlaylist, setIndex } = useCurrentPlaylistStore();
    const toast = useThrottledToast();
    const { playPreview } = usePlayPreview();
    const onPlay = usePlayThrottle(async ({ id, title, artist, image }: TrackToPlay) => {
        const list = data.tracks.items.length ? data.tracks?.items : null;
        if (!list) return toast('error', '재생할 곡이 없습니다', id);
        const index = list.findIndex((item) => item.id === id);
        const newList = list.map(({ id, name }) => ({
            id,
            title: name,
            artist: data?.artists[0].name,
            image: data?.images[0]?.url,
        }));
        await playTrackAndSkipOnError(index, newList);
    });
    const playTrackAndSkipOnError = async (index: number, list: TrackToPlay[]) => {
        try {
            const result = await playPreview(list[index]);
            if (result.success) {
                setIndex(index);
                setPlaylist([...list]);
            }
            if (!result.success) {
                playTrackAndSkipOnError(index + 1, list);
            }
        } catch {}
    };

    return (
        <table className="w-table-auto w-full table-fixed mt-2">
            <tbody>
                {data?.tracks?.items.map((track) => (
                    <TrackItem key={track.id} track={track} image={data.images[0].url} onPlay={onPlay} />
                ))}
            </tbody>
        </table>
    );
}
