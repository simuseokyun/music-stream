import styled from 'styled-components';
import { CloseBtn } from '../../../styles/common.style';
import { useSetRecoilState } from 'recoil';
import { checkFormState, playlistList } from '../../../state/atoms';
import { Button } from '../buttonForm/button';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 11;
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
const FormTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;
const FormTitle = styled.h1`
    font-size: 16px;
`;
const CheckMessage = styled.h1``;
const BtnWrap = styled.div`
    text-align: right;
    margin-top: 20px;
`;
export const CheckForm = ({ name }: { name: string }) => {
    const setCheckForm = useSetRecoilState(checkFormState);
    const setPlaylist = useSetRecoilState(playlistList);
    const navigate = useNavigate();
    const onDelete = () => {
        setPlaylist((prev) => {
            const newPlaylistList = prev.filter((playlist) => {
                return playlist.title !== name;
            });
            return newPlaylistList;
        });
        setCheckForm(false);
        navigate('/home/library');
    };
    const onClose = () => {
        setCheckForm(false);
    };
    const onCancel = () => {
        setCheckForm(false);
    };

    return (
        <Container>
            <Form>
                <FormTop>
                    <FormTitle>플레이리스트 삭제</FormTitle>
                    <CloseBtn src="/images/closeButton.png" onClick={onClose} />
                </FormTop>
                <CheckMessage>{name}을 삭제하시겠습니까 ?</CheckMessage>
                <BtnWrap>
                    <Button text="삭제" bgColor="#65d46e" onClick={onDelete} />
                    <Button text="취소" margin="0 0 0 5px" bgColor="white" onClick={onCancel} />
                </BtnWrap>
            </Form>
        </Container>
    );
};
