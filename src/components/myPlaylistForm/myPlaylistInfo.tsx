import styled from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { playlistFixFormState, playlistList } from '../../state/atoms';
import { Button } from '../common/buttonForm/button';
import { checkFormState } from '../../state/atoms';
import { CheckForm } from '../common/checkForm/checkForm';
const Container = styled.div`
    display: flex;
    align-items: end;
    margin-bottom: 20px;
    @media (max-width: 425px) {
        display: block;
    }
`;

const Cover = styled.img`
    background-color: #232323;
    width: 150px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
    @media (max-width: 425px) {
        margin: auto;
    }
`;

const Info = styled.div`
    margin-left: 20px;
    @media (max-width: 425px) {
        margin: 20px 0 0 0;
    }
`;

const Title = styled.p`
    font-size: 24px;
    margin-bottom: 5px;
    @media (max-width: 425px) {
        font-size: 20px;
    }
`;

const Length = styled.p`
    margin-bottom: 10px;
`;

const Btn = styled.button`
    display: inline-block;
    text-align: center;
    background-color: #65d46e;
    border: none;
    border-radius: 4px;
    padding: 2px 6px;
`;
export const MyPlaylistInfo = ({
    cover,
    name,
    top,
    length,
}: {
    cover: string;
    name: string;
    top?: number;
    length: number;
}) => {
    const setFixForm = useSetRecoilState(playlistFixFormState);
    const setPlaylist = useSetRecoilState(playlistList);
    const [checkForm, setCheckForm] = useRecoilState(checkFormState);
    const onFixed = () => {
        setFixForm(true);
    };
    const openCheckForm = () => {
        setCheckForm(true);
    };

    const topFixed = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
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
    const clearFixed = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
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
        <Container>
            <Cover src={cover}></Cover>
            <Info>
                <Title>
                    {name}
                    <Button text="수정" margin="0 0 0 5px" bgColor="white" onClick={onFixed} />
                </Title>
                <Length>{length + '곡'}</Length>

                {top ? (
                    <Btn name={name} onClick={clearFixed}>
                        고정 해제
                    </Btn>
                ) : (
                    <Btn name={name} onClick={topFixed}>
                        고정
                    </Btn>
                )}
                <Btn name={name} onClick={openCheckForm} style={{ marginLeft: '5px' }}>
                    삭제
                </Btn>
            </Info>
            {checkForm && <CheckForm name={name} />}
        </Container>
    );
};
