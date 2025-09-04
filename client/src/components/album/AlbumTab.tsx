import { useAlbumLike } from '../../hooks/album/useAlbumLike';
import { AlbumTab as AlbumTabProps } from '../../types/models/album';

export default function AlbumTab({ data }: { data: AlbumTabProps }) {
    const { id, name, artistId, artistName, image } = data;
    const { isLiked, likedAlbum, unLikedAlbum } = useAlbumLike({ id, name, artistId, artistName, image });
    return (
        <div className="mb-2">
            {isLiked ? (
                <button className="p-1 text-xs bg-white text-black rounded-md border" onClick={() => unLikedAlbum()}>
                    찜 해제
                </button>
            ) : (
                <button className="p-1 text-xs bg-main rounded-md border" onClick={() => likedAlbum()}>
                    찜 하기
                </button>
            )}
        </div>
    );
}
