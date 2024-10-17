import styled from 'styled-components';
import { CloseBtn } from '../../styles/common.style';
import { Background, Form, AlertMessage, AlertTop, AlertTitle } from '../../styles/common.style';
import { alertState } from '../../state/atoms';
import { useSetRecoilState } from 'recoil';
const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 12;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const AlertForm = styled.div`
    background-color: #232322;
    max-width: 500px;
    padding: 20px 20px 30px 20px;
    width: 80%;
    border-radius: 8px;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;
const Title = styled.h1`
    font-size: 18px;
`;
const Message = styled.p`
    font-size: 16px;
`;

export const RequiredPlaylist = () => {
    const alertFormState = useSetRecoilState(alertState);
    const onClose = () => {
        alertFormState((prev) => {
            return { ...prev, requiredPlaylist: false };
        });
    };
    return (
        <Background>
            <Form>
                <AlertTop>
                    <AlertTitle>알림</AlertTitle>
                    <CloseBtn src="/images/closeButton.png" onClick={onClose} alt="닫기" />
                </AlertTop>
                <AlertMessage>플레이리스트를 생성하세요</AlertMessage>
            </Form>
        </Background>
    );
};
