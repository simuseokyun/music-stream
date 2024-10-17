import styled from 'styled-components';
import { CloseBtn } from '../../styles/common.style';
import { Background, Form, AlertMessage, AlertTop, AlertTitle } from '../../styles/common.style';
import { alertState } from '../../state/atoms';
import { useSetRecoilState } from 'recoil';

export const RequiredLoginAlert = () => {
    const alertFormState = useSetRecoilState(alertState);
    const onClose = () => {
        alertFormState((prev) => {
            return { ...prev, requiredLogin: false };
        });
    };

    return (
        <Background>
            <Form>
                <AlertTop>
                    <AlertTitle>알림</AlertTitle>
                    <CloseBtn src="/images/closeButton.png" onClick={onClose} alt="닫기" />
                </AlertTop>
                <AlertMessage>로그인이 필요한 서비스입니다</AlertMessage>
            </Form>
        </Background>
    );
};
