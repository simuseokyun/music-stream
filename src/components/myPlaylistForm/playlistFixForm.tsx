import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { playlistFilter, playlistFixState, playlistList } from '../../state/atoms';
import { useRef } from 'react';
import { Message } from '../../styles/common.style';
import { Button } from '../buttonForm/button';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const FixForm = styled.div`
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

const AddFormWrap = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
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
const FormTitle = styled.h1`
    font-size: 18px;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;
const ImgWrap = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    left: calc(50% - 50px);
`;
const FormImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const ImgOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.1);
    border-radius: 8px;
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
    margin-top: 10px;
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
const Btn = styled.button`
    display: inline-block;
    text-align: center;
    background-color: #65d46e;
    border: none;
    border-radius: 20px;
    padding: 4px 8px;
`;

export const PlaylistFixForm = () => {
    const playlist = useRecoilValue(playlistFilter);
    const setPlaylists = useSetRecoilState(playlistList);
    const [value, setValue] = useState(playlist?.title || '');
    const setPlaylist = useSetRecoilState(playlistFixState);
    const [imagePreview, setImagePreview] = useState<string | null>(playlist?.img || '');
    const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setValue(value);
    };
    const submitInfo = () => {
        setPlaylists((prev) => {
            const index = prev.findIndex((ele) => ele.id === playlist?.id);
            const find = [...prev.slice(0, index), ...prev.slice(index + 1)].find((e) => {
                return e.title === value;
            });
            if (value.length < 1) {
                alert('한 글자 이상 입력하세요');
                return prev;
            }
            if (value.length > 12) {
                alert('12글자 이하로 입력하세요');
                return prev;
            }
            if (find) {
                alert('중복된 플레이리스트가 존재합니다');
                return prev;
            }

            return [
                ...prev.slice(0, index),
                { ...prev[index], title: value, img: imagePreview! },
                ...prev.slice(index + 1),
            ];
        });
        setPlaylist(false);
    };
    const closeForm = () => {
        setPlaylist(() => false);
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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <Container>
            <FixForm>
                <FormTop>
                    <FormTitle>플레이리스트 생성</FormTitle>
                </FormTop>
                <AddFormWrap>
                    <FormLeft>
                        <ImgWrap>
                            <FormImg
                                src={imagePreview ? imagePreview : '/images/spotifyLogo.png'}
                                alt="Preview"
                            ></FormImg>
                            <ImgOverlay onClick={handleClick}>
                                <Message>사진 선택</Message>
                            </ImgOverlay>
                        </ImgWrap>
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
                        <Input type="text" value={value} onChange={titleChange}></Input>
                    </FormRight>
                </AddFormWrap>
                <BtnWrap>
                    <Button text="수정" bgColor="#65d46e" onClick={submitInfo} />
                    <Button text="취소" margin="0 0 0 5px" bgColor="white" onClick={submitInfo} />
                </BtnWrap>
            </FixForm>
        </Container>
    );
};
