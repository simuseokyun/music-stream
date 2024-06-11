import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { playlistFixState, playlistList } from '../../state/atoms';
const Container = styled.div`
    display: flex;
    align-items: end;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        display: block;
    }
`;

const Cover = styled.img`
    background-color: #232323;
    width: 150px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
    @media (max-width: 768px) {
        margin: auto;
    }
`;

const Info = styled.div`
    margin-left: 20px;
    @media (max-width: 768px) {
        margin: 20px 0 0 0;
    }
`;

const Title = styled.p`
    font-size: 24px;
    margin-bottom: 5px;
    @media (max-width: 768px) {
        font-size: 20px;
    }
`;
const SetIcon = styled.span`
    font-size: 24px;
    vertical-align: middle;
`;
const Length = styled.p`
    margin-bottom: 10px;
`;
const Btn = styled.button`
    display: inline-block;
    text-align: center;
    background-color: #65d46e;
    border: none;
    border-radius: 20px;
    padding: 4px 8px;
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
    const setFixForm = useSetRecoilState(playlistFixState);
    const [playlists, setPlaylists] = useRecoilState(playlistList);
    const navigate = useNavigate();
    const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setPlaylists((prev) => {
            const filter = prev.filter((playlist) => {
                return playlist.title !== name;
            });
            return filter;
        });
        navigate('/home');
    };
    const topFixed = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setPlaylists((prev) => {
            const fil = prev.filter((playlist) => playlist.hasOwnProperty('top'));
            if (fil.length > 2) {
                alert('플레이리스트는 최대 3개까지 고정할 수 있습니다');
                return prev;
            }
            const index = prev.findIndex((playlist) => {
                return playlist.title === name;
            });
            const value = { ...prev[index], top: Date.now() };

            const newTracks = [value, ...prev.slice(0, index), ...prev.slice(index + 1)];
            return newTracks;
        });
    };
    const clearFixed = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setPlaylists((prev) => {
            const index = prev.findIndex((playlist) => {
                return playlist.title == name;
            });
            const value = [{ ...prev[index] }].map((playlist) => {
                const { top, ...rest } = playlist;
                return rest;
            });
            const setValue = [...prev.slice(0, index), ...value, ...prev.slice(index + 1)];
            const topFilter = setValue.filter((playlist) => {
                return playlist.hasOwnProperty('top');
            });
            const botFilter = setValue.filter((playlist) => {
                return !playlist.hasOwnProperty('top');
            });

            const sort = [...botFilter].sort((a, b) => {
                if (a.id > b.id) {
                    return 1;
                } else {
                    return -1;
                }
            });

            return [...topFilter, ...sort];
        });
    };
    return (
        <Container>
            <Cover src={cover}></Cover>
            <Info>
                <Title>
                    {name}
                    <SetIcon className="material-symbols-outlined" onClick={() => setFixForm(() => true)}>
                        border_color
                    </SetIcon>
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
                <Btn name={name} onClick={onDelete} style={{ marginLeft: '5px' }}>
                    삭제
                </Btn>
            </Info>
        </Container>
    );
};
