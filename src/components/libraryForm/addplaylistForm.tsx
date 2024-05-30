import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addPlaylistState, clickMenuAlbum, clickMenuPlaylist, playlistList } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef } from 'react';

interface IData {
    title: string;
    file?: FileList;
}
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
const Form = styled.div`
    background-color: #232322;
    width: 80%;
    max-width: 500px;
    padding: 20px;
    border-radius: 8px;
`;
const FormTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;
const AddForm = styled.form``;
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
    margin-top: 10px;
    outline: none;
    color: white;
    border: 1px solid transparent;
    background-color: rgb(40, 40, 40);
`;
const CloseBtn = styled.span`
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 15px;
    border-radius: 25px;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }
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
const SubMessage = styled.p``;
export const AddPlaylistForm = () => {
    const addPlaylist = useSetRecoilState(playlistList);
    const close = useSetRecoilState(addPlaylistState);
    const setPlaylistState = useSetRecoilState(clickMenuPlaylist);
    const setAlbumtState = useSetRecoilState(clickMenuAlbum);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const { register, handleSubmit, setValue } = useForm<IData>();
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
    const onValid = async ({ title }: IData) => {
        addPlaylist((prev) => {
            const fil = prev.find((playlist) => {
                return playlist.title === title;
            });
            if (fil) {
                alert('중복된 플레이리스트가 존재합니다');
                return prev;
            }
            if (!title) {
                const value = [
                    ...prev,
                    {
                        id: String(Date.now()),
                        title: `플레이리스트 #${prev.length + 1}`,
                        img: imagePreview ? imagePreview : '/images/basic_playlist.png',
                        tracks: [],
                    },
                ];
                return value;
            }

            const value = [
                ...prev,
                {
                    id: String(Date.now()),
                    title,
                    img: imagePreview ? imagePreview : '/images/basic_playlist.png',
                    tracks: [],
                },
            ];
            return value;
        });

        setPlaylistState(true);
        setAlbumtState(false);
        close(false);
        setValue('title', '');
    };

    const onClose = () => {
        close(false);
    };

    return (
        <Container>
            <Form>
                <FormTop>
                    <FormTitle>플레이리스트 생성</FormTitle>
                    <CloseBtn className="material-symbols-outlined" onClick={onClose}>
                        close
                    </CloseBtn>
                </FormTop>
                <AddForm onSubmit={handleSubmit(onValid)}>
                    <AddFormWrap>
                        <FormLeft>
                            <ImgWrap>
                                <FormImg
                                    src={imagePreview ? imagePreview : '/images/basic_playlist.png'}
                                    alt="Preview"
                                ></FormImg>
                                <ImgOverlay onClick={handleClick}>
                                    <SubMessage>사진 선택</SubMessage>
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
                            <Input
                                {...register('title', {
                                    required: false,
                                    maxLength: { value: 12, message: '12글자 이하로 입력해주세요' },
                                })}
                                type="text"
                                placeholder="플레이리스트 이름을 작성해주세요"
                            />
                        </FormRight>
                    </AddFormWrap>
                    <BtnWrap>
                        <Btn type="submit">생성하기</Btn>
                    </BtnWrap>
                </AddForm>
            </Form>
        </Container>
    );
};
