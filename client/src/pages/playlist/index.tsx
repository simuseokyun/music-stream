import { useParams } from 'react-router-dom';
import PlaylistInfo from '../../components/playlist/PlaylistInfo';
import PlaylistTracks from '../../components/playlist/PlaylistTracks';
export default function Playlist() {
    const { playlistId } = useParams();
    return (
        <div className="flex-1">
            <div className="relative md:p-[20px]rounded-md">
                <PlaylistInfo playlistId={playlistId} />
                <PlaylistTracks playlistId={playlistId} />
            </div>
        </div>
    );
}
