import styled from 'styled-components';
import { CloseBtn } from '../../styles/common.style';
import { Background, Form, AlertMessage, AlertTop, AlertTitle } from '../../styles/common.style';
import { alertState } from '../../state/atoms';
import { useSetRecoilState } from 'recoil';

export const DuplicateSongAlert = () => {
    const alertFormState = useSetRecoilState(alertState);
    const onClose = () => {
        alertFormState((prev) => {
            return { ...prev, duplicateSong: false };
        });
    };
    return (
        <Background>
            <Form>
                <AlertTop>
                    <AlertTitle>알림</AlertTitle>
                    <CloseBtn src="/images/closeButton.png" onClick={onClose} alt="닫기" />
                </AlertTop>
                <AlertMessage>이미 곡이 추가되었습니다</AlertMessage>
            </Form>
        </Background>
    );
};
