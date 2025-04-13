import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectPlaylist, playlistFixFormState, playlistList } from '../../store/atoms';
import { Message, Container, Form } from '../../styles/common.style';
import { Button } from '../common/buttonForm/Button';

const Wrap = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-top: 20px;
    @media (max-width: 768px) {
        display: block;
    }
`;
const FormLeft = styled.div``;
const FormRight = styled.div`
    width: 100%;
    margin-left: 20px;
    @media (max-width: 768px) {
        margin-left: 0;
    }
`;
const FormTitle = styled.h1``;
const CoverWrap = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    left: calc(50% - 50px);
`;
const Cover = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    object-fit: cover;
`;
const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.7);

    display: flex;
    justify-content: center;
    align-items: center;
    p {
        font-size: 12px;
    }
`;

const Input = styled.input`
    width: 100%;
    display: inline-block;
    padding: 4px;
    outline: none;
    margin-top: 5px;
    color: white;
    border: 1px solid transparent;
    background-color: rgb(40, 40, 40);
`;

const Title = styled.p`
    margin-bottom: 2px;
    @media (max-width: 768px) {
        margin-top: 10px;
    }
`;
const BtnWrap = styled.div`
    text-align: right;
    margin-top: 20px;
`;

export const FixPlaylistForm = () => {
    const playlist = useRecoilValue(selectPlaylist);
    const setPlaylists = useSetRecoilState(playlistList);
    const [title, setTitle] = useState(playlist?.title || '');
    const fixFormState = useSetRecoilState(playlistFixFormState);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(playlist?.cover || null);
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (typeof e.target?.result === 'string') {
                    setImagePreview(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setTitle(value);
    };
    const onEditTitle = () => {
        setPlaylists((prev) => {
            const index = prev.findIndex((list) => list.id === playlist?.id);
            const find = [...prev.slice(0, index), ...prev.slice(index + 1)].find((e) => {
                return e.title === title;
            });
            if (title.length < 1) {
                alert('한 글자 이상 입력하세요');
                return prev;
            }
            if (title.length > 12) {
                alert('12글자 이하로 입력하세요');
                return prev;
            }
            if (find) {
                alert('중복된 플레이리스트가 존재합니다');
                return prev;
            }
            console.log('테스트');

            return [...prev.slice(0, index), { ...prev[index], title, cover: imagePreview! }, ...prev.slice(index + 1)];
        });
        fixFormState(false);
    };
    const onClose = () => {
        fixFormState(false);
    };

    return (
        <Container>
            <Form>
                <FormTitle>플레이리스트 수정</FormTitle>
                <Wrap>
                    <FormLeft>
                        <CoverWrap>
                            <Cover
                                src={imagePreview ? imagePreview : '/assets/basicPlaylist.png'}
                                alt="Preview"
                            ></Cover>
                            <Overlay onClick={handleClick}>
                                <Message>사진 선택</Message>
                            </Overlay>
                        </CoverWrap>
                        <Input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </FormLeft>
                    <FormRight>
                        <Title>제목</Title>
                        <Input type="text" value={title} onChange={onTitleChange}></Input>
                    </FormRight>
                </Wrap>
                <BtnWrap>
                    <Button text="수정" bgColor="#65d46e" onClick={onEditTitle} />
                    <Button text="취소" margin="0 0 0 5px" bgColor="white" onClick={onClose} />
                </BtnWrap>
            </Form>
        </Container>
    );
};
