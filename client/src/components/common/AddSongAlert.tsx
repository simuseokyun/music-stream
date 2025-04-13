import styled from 'styled-components';
import { CloseBtn } from '../../styles/common.style';
import { alertFormState } from '../../store/atoms';
import { useRecoilState } from 'recoil';
import { Container, Modal, AlertMessage, AlertTop, AlertTitle } from '../../styles/common.style';

export const AddSongAlert = () => {
    const [alertState, setAlertState] = useRecoilState(alertFormState);
    const onClose = () => {
        setAlertState((prev) => {
            return { ...prev, addSong: false };
        });
    };
    return (
        <>
            {alertState.addSong && (
                <Container>
                    <Modal>
                        <AlertTop>
                            <AlertTitle>알림</AlertTitle>
                            <CloseBtn src="/assets/closeButton.png" onClick={onClose} alt="닫기" />
                        </AlertTop>
                        <AlertMessage>곡을 추가하였습니다</AlertMessage>
                    </Modal>
                </Container>
            )}
        </>
    );
};
