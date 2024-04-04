import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addPlaylistState, playlistList } from '../atoms';

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

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IData>();

    const onValid = ({ title }: IData) => {
        addPlaylist((prev) => [{ id: String(Date.now()), title, img: '1' }, ...prev]);
        close(false);
        setValue('title', '');
    };
    console.log(playList);
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
                            required: { value: true, message: '필수 값 입니다' },
                            minLength: { value: 2, message: '두 글자 이상 입력해주세요' },
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
