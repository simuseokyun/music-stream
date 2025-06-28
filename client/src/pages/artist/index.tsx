import { useParams, Link } from 'react-router-dom';
import ArtistImage from '../../components/artist/ArtistImage';
import TrackList from '../../components/artist/FiveTrackList';
import AlbumList from '../../components/artist/AlbumList';

export default function Artist() {
    const { artistId } = useParams();

    return (
        <div className="flex-1 rounded-[8px]">
            <ArtistImage artistId={artistId} />
            <h1 className="text-2xl font-bold mt-[20px] border-t-1 border-white/20 pt-[20px]">인기 곡</h1>
            <TrackList artistId={artistId} />
            <h1 className="text-2xl font-bold mt-[20px] border-t-1 border-white/20 pt-[20px]">디스코그래피</h1>
            <div className="text-right mb-4">
                <Link to={`/allAlbum/${artistId}`}>모두 표시</Link>
            </div>
            <AlbumList artistId={artistId} />
        </div>
    );
}
