import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addPlaylistState, clickMenuAlbum, clickMenuPlaylist, clickPlaylistState, playlistList } from '../atoms';
import { useNavigate } from 'react-router-dom';

interface IData {
    title: string;
}
const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Form = styled.div`
    background-color: #232322;
    max-width: 500px;
    padding: 20px;
    width: 80%;
    border-radius: 8px;
`;
const AddForm = styled.form``;
const FormTitle = styled.h1`
    font-size: 18px;
`;
const Input = styled.input`
    width: 100%;
`;
const CloseBtn = styled.span`
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 15px;
    border-radius: 25px;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }
`;

export const AddPlaylistForm = () => {
    const addPlaylist = useSetRecoilState(playlistList);
    const playList = useRecoilValue(playlistList);
    const close = useSetRecoilState(addPlaylistState);
    const setPlaylistState = useSetRecoilState(clickMenuPlaylist);
    const setAlbumtState = useSetRecoilState(clickMenuAlbum);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IData>();

    const onValid = async ({ title }: IData) => {
        addPlaylist((prev) => {
            const fil = prev.find((playlist) => {
                return playlist.title === title;
            });
            if (fil) {
                alert('중복된 플레이리스트가 존재합니다');
                return prev;
            }
            if (!title) {
                const value = [
                    ...prev,
                    {
                        id: String(Date.now()),
                        title: `플레이리스트 #${prev.length + 1}`,
                        img: '',
                        tracks: [],
                        top: null,
                    },
                ];
                // const newArr = value.sort((a, b) => {
                //     if (Number(a.id) > Number(b.id)) {
                //         return 1;
                //     } else {
                //         return -1;
                //     }
                // });
                const topTrueTracks = value.filter((track) => {
                    return track.top !== null;
                });
                const topFalseTracks = value.filter((track) => {
                    return track.top === null;
                });
                const newTracks = [...topTrueTracks, ...topFalseTracks];
                return newTracks;
            }

            const value = [...prev, { id: String(Date.now()), title, img: '', tracks: [], top: null }];
            // const newArr = value.sort((a, b) => {
            //     if (Number(a.id) > Number(b.id)) {
            //         return 1;
            //     } else {
            //         return -1;
            //     }
            // });
            const topTrueTracks = value.filter((track) => {
                return track.top !== null;
            });
            const topFalseTracks = value.filter((track) => {
                return track.top === null;
            });

            const newTracks = [...topTrueTracks, ...topFalseTracks];
            return newTracks;
        });

        setPlaylistState(true);
        setAlbumtState(false);
        close(false);
        setValue('title', '');
    };

    const onClose = () => {
        close(false);
    };

    return (
        <Container>
            <Form>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormTitle>플레이리스트 생성</FormTitle>
                    <CloseBtn className="material-symbols-outlined" onClick={onClose}>
                        close
                    </CloseBtn>
                </div>
                <AddForm onSubmit={handleSubmit(onValid)}>
                    <Input
                        {...register('title', {
                            required: false,
                        })}
                        type="text"
                        placeholder="플레이리스트 이름을 작성해주세요"
                    />
                    <button type="submit">추가</button>
                </AddForm>
            </Form>
        </Container>
    );
};
