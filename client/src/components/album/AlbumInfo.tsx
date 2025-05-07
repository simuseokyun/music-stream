import { Link, useParams } from 'react-router-dom';
import { AlbumTab } from './AlbumTab';
import useAlbumInfo from '../../store/useAlbumInfo';
import { AlbumType } from '../../types/common';
export const AlbumInfo = () => {
    const { id, name, artist_name, image, type, track_length, artist_id } = useAlbumInfo();

    return (
        <div className="text-center md:flex md:items-end md:text-start border-b-1 border-white/20 pb-[20px]">
            <img
                className="inline-block w-[200px] rounded-[8px] max-[768px]:w-[150px] max-[425px]:mx-auto"
                src={image}
            />
            <div className="md:ml-4">
                <span className="mb-2 hidden md:block">{AlbumType[type as keyof typeof AlbumType] ?? ''}</span>
                <h1 className="text-[24px] mt-2 my-[4px] font-bold  md:text-[30px] md:mt-0">{name}</h1>
                <div className="mb-2">
                    <Link className="md:hover:underline text-sub" to={`/artist/${artist_id}`}>
                        {artist_name}
                    </Link>
                    <span className="text-sm mt-2 hidden md:block">{track_length}곡</span>
                </div>
                <AlbumTab {...{ id, name, artist_name, artist_id, image, type }} />
            </div>
        </div>
    );
};
