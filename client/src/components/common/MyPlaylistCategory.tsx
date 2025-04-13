import styled from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { playlistFixFormState, playlistList, checkFormState } from '../../store/atoms';
import { clear } from 'console';

const Category = styled.ul`
    position: absolute;
    left: 0;
    top: 20;
    width: 100px;
    padding: 5px;
    border-radius: 8px;
    background-color: #333333;
`;
const CategoryItem = styled.li`
    color: white;
    padding: 5px;
    transition: all 0.2s;
    border-radius: 5px;
    &:hover {
        background-color: #3e3d3d;
    }
`;
export const MyPlaylistCategory = ({ name, top }: { name: string; top?: number }) => {
    const setFixForm = useSetRecoilState(playlistFixFormState);
    const setPlaylist = useSetRecoilState(playlistList);
    const [checkForm, setCheckForm] = useRecoilState(checkFormState);

    const onFixed = () => {
        setFixForm(true);
    };
    const openCheckForm = () => {
        setCheckForm(true);
    };

    const topFixed = (event: React.MouseEvent<HTMLLIElement>) => {
        // const {
        //     currentTarget: { name },
        // } = event;
        setPlaylist((prev) => {
            const hasTop = prev.filter((playlist) => playlist.hasOwnProperty('top'));
            if (hasTop.length > 2) {
                alert('플레이리스트는 최대 3개까지 고정할 수 있습니다');
                return prev;
            }
            const index = prev.findIndex((playlist) => {
                return playlist.title === name;
            });
            const value = { ...prev[index], top: Date.now() };
            const newPlaylistList = [value, ...prev.slice(0, index), ...prev.slice(index + 1)];
            return newPlaylistList;
        });
    };
    const clearFixed = (event: React.MouseEvent<HTMLLIElement>) => {
        // const {
        //     currentTarget: { name },
        // } = event;
        setPlaylist((prev) => {
            const index = prev.findIndex((playlist) => {
                return playlist.title == name;
            });
            const value = [{ ...prev[index] }].map((playlist) => {
                const { top, ...rest } = playlist;
                return rest;
            });
            const setValue = [...prev.slice(0, index), ...value, ...prev.slice(index + 1)];
            const topPlaylist = setValue.filter((playlist) => {
                return playlist.hasOwnProperty('top');
            });
            let botPlaylist = setValue.filter((playlist) => {
                return !playlist.hasOwnProperty('top');
            });

            botPlaylist = [...botPlaylist].sort((a, b) => {
                if (a.id > b.id) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return [...topPlaylist, ...botPlaylist];
        });
    };
    return (
        <Category>
            {top ? (
                <CategoryItem onClick={clearFixed}>고정해제</CategoryItem>
            ) : (
                <CategoryItem onClick={topFixed}>고정</CategoryItem>
            )}
            <CategoryItem onClick={onFixed}>수정</CategoryItem>
            <CategoryItem onClick={openCheckForm}>삭제</CategoryItem>
        </Category>
    );
};
