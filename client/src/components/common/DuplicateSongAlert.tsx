import styled from 'styled-components';
import { CloseBtn } from '../../styles/common.style';
import { Container, Modal, AlertMessage, AlertTop, AlertTitle } from '../../styles/common.style';
import { alertFormState } from '../../store/atoms';
import { useRecoilState } from 'recoil';

export const DuplicateSongAlert = () => {
    const [alertState, setAlertState] = useRecoilState(alertFormState);
    const onClose = () => {
        setAlertState((prev) => {
            return { ...prev, duplicateSong: false };
        });
        return (
            <>
                {/* {alertState.duplicateSong && (
                    <Container>
                        <Modal>
                            <AlertTop>
                                <AlertTitle>알림</AlertTitle>
                                <CloseBtn src="/assets/closeButton.png" onClick={onClose} alt="닫기" />
                            </AlertTop>
                            <AlertMessage>이미 곡이 추가되었습니다</AlertMessage>
                        </Modal>
                    </Container>
                )}
                 */}
                <h1>d</h1>
            </>
        );
    };
};
