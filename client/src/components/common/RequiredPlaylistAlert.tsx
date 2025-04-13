import { CloseBtn } from '../../styles/common.style';
import { Container, Modal, AlertMessage, AlertTop, AlertTitle } from '../../styles/common.style';
import { alertFormState } from '../../store/atoms';
import { useRecoilState } from 'recoil';

export const RequiredPlaylist = () => {
    const [alertState, setAlertState] = useRecoilState(alertFormState);
    const onClose = () => {
        setAlertState((prev) => {
            return { ...prev, requiredPlaylist: false };
        });
    };
    console.log('켜짐');
    return (
        <>
            {alertState.requiredPlaylist && (
                <Container>
                    <Modal>
                        <AlertTop>
                            <AlertTitle>알림</AlertTitle>
                            <CloseBtn src="/assets/closeButton.png" onClick={onClose} alt="닫기" />
                        </AlertTop>
                        <AlertMessage>플레이리스트를 생성하세요</AlertMessage>
                    </Modal>
                </Container>
            )}
        </>
    );
};
