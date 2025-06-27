import { useAlbumLike } from '../../hooks/album/useAlbumLike';

import { AlbumTab as IAlbumTab } from '../../types/models/album';

export default function AlbumTab({ id, name, artist_name, artist_id, image }: IAlbumTab) {
    const { isLiked, addAlbum, deleteAlbum } = useAlbumLike(id, name, artist_name, artist_id, image);
    return (
        <div>
            {isLiked ? (
                <button
                    className="p-1 text-xs bg-sub text-black rounded-md border-1"
                    onClick={() => deleteAlbum.mutate()}
                >
                    찜 해제
                </button>
            ) : (
                <button className="p-1 text-xs bg-main rounded-md border-1" onClick={() => addAlbum.mutate()}>
                    찜 하기
                </button>
            )}
        </div>
    );
}
