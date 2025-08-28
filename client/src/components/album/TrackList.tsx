import TrackItem from './TrackItem';
import useThrottledToast from '../../hooks/common/useTrottledToast';
import usePlayThrottle from '../../hooks/player/usePlayThrottle';
import usePlayTrack from '../../hooks/player/usePlayTrack';
import { AlbumInfoResponse } from '../../types/api/album';

export default function TrackList({ data }: { data: AlbumInfoResponse }) {
    const { playTrack } = usePlayTrack();
    const toast = useThrottledToast();
    const onPlay = usePlayThrottle(async ({ id }: { id: string }) => {
        const list = data?.tracks?.items ?? [];
        if (!list) {
            toast('error', '곡을 재생할 수 없습니다');
            return;
        }
        const index = list.findIndex((item) => item.id === id);
        const newList = list.map(({ id, name }) => ({
            id,
            title: name,
            artist: data?.artists[0]?.name,
            image: data?.images[0]?.url,
        }));
        await playTrack(index, newList);
    });

    return (
        <table className="w-full table-fixed mt-2">
            <tbody>
                {data?.tracks?.items.map((track) => (
                    <TrackItem key={track.id} track={track} image={data?.images[0]?.url} onPlay={onPlay} />
                ))}
            </tbody>
        </table>
    );
}
