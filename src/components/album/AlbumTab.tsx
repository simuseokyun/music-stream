import { useRecoilState, useSetRecoilState } from 'recoil';
import { myAlbumList } from '../../store/atoms';
import { libraryState } from '../../store/atoms';
import { Button } from '../common/buttonForm/button';

export const AlbumTab = ({
    title,
    artist,
    cover,
    id,
}: {
    title: string;
    artist: string;
    cover: string;
    id: string;
}) => {
    const [myAlbums, setMyAlbums] = useRecoilState(myAlbumList);
    const setLibraryState = useSetRecoilState(libraryState);
    const saveAlbumState = [...myAlbums].find((album) => {
        return album.name === title;
    });

    const addAlbum = () => {
        setMyAlbums((prev) => {
            return [...prev, { cover, name: title, artist, id }];
        });
        setLibraryState({ playlist: false, album: true });
    };
    const deleteAlbum = () => {
        setMyAlbums((prev) => {
            const newAlbums = prev.filter((saveAlbum) => {
                return saveAlbum.name !== title;
            });
            return newAlbums;
        });
    };
    return (
        <>
            {saveAlbumState ? (
                <Button fontSize="12px" padding="4px" bgColor="#e2e2e2" text="앨범 삭제" onClick={deleteAlbum} />
            ) : (
                <Button fontSize="12px" padding="4px" bgColor="#65d46e" text="앨범 추가" onClick={addAlbum} />
            )}
        </>
    );
};
