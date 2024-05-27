import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { playlistFilter, playlistFixState, playlistList } from '../../atoms';
import { useRef } from 'react';

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
const AddForm = styled.form``;
const AddFormWrap = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
`;
const FormLeft = styled.div`
    width: 100px;
`;
const FormRight = styled.div`
    width: 100%;
    margin-left: 20px;
`;
const FormTitle = styled.h1`
    font-size: 18px;
`;
const ImgWrap = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    &:hover {
        div {
            opacity: 1;
        }
    }
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
    opacity: 0;

    p {
        font-size: 12px;
    }
`;

const Input = styled.input`
    width: 100%;
    display: inline-block;
    padding: 4px;
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
const BtnWrap = styled.div`
    text-align: right;
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
    const [playlists, setPlaylists] = useRecoilState(playlistList);
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
            if (value.length > 20) {
                alert('20글자 이하로 입력하세요');
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
                    <FormTitle>플레이리스트 수정</FormTitle>
                </FormTop>

                <AddFormWrap>
                    <FormLeft>
                        <ImgWrap>
                            <FormImg src={imagePreview!} alt="Preview" />
                            <ImgOverlay onClick={handleClick}>
                                <p>사진 선택</p>
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
                        <p style={{ fontSize: '14px', marginBottom: '2px' }}>제목</p>
                        <Input type="text" value={value} onChange={titleChange}></Input>
                    </FormRight>
                </AddFormWrap>
                <BtnWrap>
                    <Btn onClick={submitInfo}>수정</Btn>
                    <Btn
                        style={{ marginLeft: '5px', background: 'White' }}
                        onClick={() => {
                            setPlaylist(() => false);
                        }}
                    >
                        취소
                    </Btn>
                </BtnWrap>
            </FixForm>
        </Container>
    );
};
