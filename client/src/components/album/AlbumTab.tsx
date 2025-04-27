import { useRecoilState, useSetRecoilState } from 'recoil';
import { myAlbumList } from '../../store/atoms';
import { libraryState } from '../../store/atoms';
import { Button } from '../common/buttonForm/Button';
interface IAlbumTab {
    title: string;
    artist: string;
    cover: string;
    id: string;
}
export const AlbumTab = ({ title, artist, cover, id }: IAlbumTab) => {
    return (
        <>
            {/* <button className="p-2 text-xs rounded-md">찜 해제</button> */}
            <button className="p-1 text-xs bg-main rounded-md border-1">찜 하기</button>
        </>
    );
};
