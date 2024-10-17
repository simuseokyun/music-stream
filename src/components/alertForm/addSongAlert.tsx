import styled from 'styled-components';
import { CloseBtn } from '../../styles/common.style';
import { alertState } from '../../state/atoms';
import { useSetRecoilState } from 'recoil';
import { Background, Form, AlertMessage, AlertTop, AlertTitle } from '../../styles/common.style';

export const AddSongAlert = () => {
    const alertFormState = useSetRecoilState(alertState);
    const onClose = () => {
        alertFormState((prev) => {
            return { ...prev, addSong: false };
        });
    };
    return (
        <Background>
            <Form>
                <AlertTop>
                    <AlertTitle>알림</AlertTitle>
                    <CloseBtn src="/images/closeButton.png" onClick={onClose} alt="닫기" />
                </AlertTop>
                <AlertMessage>곡을 추가하였습니다</AlertMessage>
            </Form>
        </Background>
    );
};
