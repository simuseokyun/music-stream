import { TrackItem } from './AlbumTrackItem';
import { IAlbumData } from '../../types/albumInfo';

export const TrackList = ({ data }: IAlbumData) => {
    return (
        <table className="w-table-auto w-full table-fixed mt-2">
            <tbody>
                {data?.tracks?.items.map(({ id, name, artists, uri }) => (
                    <TrackItem
                        key={id}
                        track_id={id}
                        track_title={name}
                        album_title={data.name}
                        cover={data.images[0].url}
                        artists={artists}
                        album_id={data.id}
                        trackUri={uri}
                    />
                ))}
            </tbody>
        </table>
    );
};
