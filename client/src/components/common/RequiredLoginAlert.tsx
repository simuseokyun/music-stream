import styled from 'styled-components';
import { CloseBtn } from '../../styles/common.style';
import { Container, Modal, AlertMessage, AlertTop, AlertTitle } from '../../styles/common.style';
import { alertFormState } from '../../store/atoms';
import { useSetRecoilState, useRecoilState } from 'recoil';

export const RequiredLoginAlert = () => {
    const [alertState, setAlertState] = useRecoilState(alertFormState);
    const onClose = () => {
        setAlertState((prev) => {
            return { ...prev, requiredLogin: false };
        });
    };

    return (
        <>
            {alertState.requiredLogin && (
                <Container>
                    <Modal>
                        <AlertTop>
                            <AlertTitle>알림</AlertTitle>
                            <CloseBtn src="/assets/closeButton.png" onClick={onClose} alt="닫기" />
                        </AlertTop>
                        <AlertMessage>로그인이 필요한 서비스입니다</AlertMessage>
                    </Modal>
                </Container>
            )}
        </>
    );
};
