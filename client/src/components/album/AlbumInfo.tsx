import { Link } from 'react-router-dom';
import AlbumTab from './AlbumTab';
import { AlbumType } from '../../types/models/album';
import useUserStore from '../../store/user';
import useAlbumStore from '../../store/album';
export default function AlbumInfo() {
    const session = useUserStore((state) => state.user);
    const { id, name, artistName, image, type, trackLength, artistId } = useAlbumStore();
    const tabProps = { id, name, artistId, artistName, image };
    return (
        <div className="text-center border-b border-white/20 pb-5 md:flex md:items-end md:text-start ">
            <img className="w-[150px] rounded-md md:w-[200px]" src={image} alt="앨범 커버" />
            <div className="md:ml-4">
                <span className="mb-2 hidden md:block">{AlbumType[type as keyof typeof AlbumType]}</span>
                <h1
                    className="text-2xl mt-4 font-bold md:text-[30px] md:mt-0 
               line-clamp-2 break-words"
                >
                    {name}
                </h1>
                <div className="my-1">
                    <Link className="md:hover:underline text-sub" to={`/artist/${artistId}`}>
                        {artistName}
                    </Link>
                    <span className="text-sm text-sub ml-2">{trackLength}곡</span>
                </div>
                {session && <AlbumTab data={tabProps} />}
            </div>
        </div>
    );
}
