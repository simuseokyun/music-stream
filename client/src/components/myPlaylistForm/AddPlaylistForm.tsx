import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { addPlaylistState, libraryState, playlistList } from '../../store/atoms';
import { CloseBtn, Message, Container, Form } from '../../styles/common.style';

const FormTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const FormWrap = styled.div`
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
        margin: 10px 0 0 0;
    }
`;
const FormTitle = styled.h1`
    font-size: 16px;
`;
const CoverWrap = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 8px;
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
    background-color: rgb(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        font-size: 12px;
    }
`;
const Title = styled.p``;

const Input = styled.input`
    width: 100%;
    display: inline-block;
    padding: 4px;
    margin-top: 5px;
    outline: none;
    color: white;
    border: 1px solid transparent;
    background-color: rgb(40, 40, 40);
`;
const ErrMessage = styled.p`
    font-size: 12px;
    color: #65d46e;
    margin-top: 10px;
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

export const AddPlaylistForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm<{ title: string; file?: FileList }>();

    const addPlaylist = useSetRecoilState(playlistList);
    const setAddFormState = useSetRecoilState(addPlaylistState);
    const setLibraryState = useSetRecoilState(libraryState);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dupState, setDupState] = useState<boolean | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
    const onValid = ({ title }: { title: string; file?: FileList }) => {
        addPlaylist((prev) => {
            const isDuplicate = prev.some((playlist) => playlist.title === title);
            if (isDuplicate) {
                setError('title', {
                    type: 'manual', // 수동으로 에러를 설정
                    message: '중복된 제목이 존재합니다.',
                });
                setDupState(true);
                return prev;
            } else {
                const newPlaylist = {
                    id: String(Date.now()),
                    title: title || `플레이리스트#${prev.length + 1}`,
                    cover: imagePreview ?? '/assets/basicPlaylist.png',
                    tracks: [],
                };
                setDupState(false);
                return [...prev, newPlaylist];
            }
        });
        setValue('title', '');
    };
    const onClose = () => {
        setAddFormState(false);
    };
    useEffect(() => {
        if (dupState) {
            setAddFormState(true);
        } else if (!dupState && dupState !== null) {
            setAddFormState(false);
            setLibraryState({ playlist: true, album: false });
        }
    }, [dupState]);

    return (
        <Container>
            <Form onSubmit={handleSubmit(onValid)}>
                <FormTop>
                    <FormTitle>플레이리스트 생성</FormTitle>
                    <CloseBtn src="/assets/closeButton.png" alt="닫기" onClick={onClose} />
                </FormTop>
                <FormWrap>
                    <FormLeft>
                        <CoverWrap>
                            <Cover src={imagePreview ?? '/assets/basicPlaylist.png'} alt="Preview"></Cover>
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
                        <Title>이름</Title>
                        <Input
                            {...register('title', {
                                required: false,
                                maxLength: { value: 12, message: '12글자 이하로 입력해주세요' },
                            })}
                            type="text"
                            placeholder="플레이리스트 이름을 작성해주세요"
                        />
                        {/* {dupState && <DupMessage>중복된 플레이리스트가 존재합니다</DupMessage>} */}
                        {errors.title && <ErrMessage>{errors.title.message}</ErrMessage>}
                    </FormRight>
                </FormWrap>
                <BtnWrap>
                    <Btn type="submit">생성</Btn>
                </BtnWrap>
            </Form>
        </Container>
    );
};
// import React, { useState, useRef, useEffect } from 'react';
// import styled from 'styled-components';
// import { useForm } from 'react-hook-form';
// import { useSetRecoilState } from 'recoil';
// import { addPlaylistState, libraryState, playlistList } from '../../store/atoms';
// import { CloseBtn, Message, Container, Form } from '../../styles/common.style';

// const FormTop = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 20px;
// `;

// const FormWrap = styled.div`
//     display: flex;
//     align-items: start;
//     justify-content: space-between;
//     @media (max-width: 768px) {
//         display: block;
//     }
// `;
// const FormLeft = styled.div``;
// const FormRight = styled.div`
//     width: 100%;
//     margin-left: 20px;
//     @media (max-width: 768px) {
//         margin: 10px 0 0 0;
//     }
// `;
// const FormTitle = styled.h1`
//     font-size: 16px;
// `;
// const CoverWrap = styled.div`
//     position: relative;
//     width: 100px;
//     height: 100px;
//     overflow: hidden;
//     border-radius: 8px;
//     left: calc(50% - 50px);
// `;
// const Cover = styled.img`
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
// `;
// const Overlay = styled.div`
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgb(0, 0, 0, 0.6);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     p {
//         font-size: 12px;
//     }
// `;
// const Title = styled.p``;

// const Input = styled.input`
//     width: 100%;
//     display: inline-block;
//     padding: 4px;
//     margin-top: 5px;
//     outline: none;
//     color: white;
//     border: 1px solid transparent;
//     background-color: rgb(40, 40, 40);
// `;
// const AlertMessage = styled.p`
//     font-size: 12px;
//     color: #65d46e;
//     margin-top: 5px;
// `;

// const BtnWrap = styled.div`
//     text-align: right;
//     margin-top: 20px;
// `;
// const Btn = styled.button`
//     display: inline-block;
//     text-align: center;
//     background-color: #65d46e;
//     border: none;
//     border-radius: 20px;
//     padding: 4px 8px;
// `;

// export const AddPlaylistForm = () => {
//     const {
//         register,
//         handleSubmit,
//         setValue,
//         setError,
//         formState: { errors },
//     } = useForm<{ title: string; file?: FileList }>();

//     const addPlaylist = useSetRecoilState(playlistList);
//     const setAddFormState = useSetRecoilState(addPlaylistState);
//     const setLibraryState = useSetRecoilState(libraryState);
//     const [imagePreview, setImagePreview] = useState<string | null>(null);
//     const [dupState, setDupState] = useState<boolean>(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleClick = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     };
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 if (typeof e.target?.result === 'string') {
//                     setImagePreview(e.target.result);
//                 }
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//     const onValid = ({ title }: { title: string; file?: FileList }) => {
//         addPlaylist((prev) => {
//             const isDuplicate = prev.some((playlist) => playlist.title === title);
//             if (isDuplicate) {
//                 setError('title', {
//                     type: 'manual',
//                     message: '중복된 플레이리스트가 존재합니다.',
//                 });
//                 setDupState(true);
//                 return prev;
//             } else {
//                 const newPlaylist = {
//                     id: String(Date.now()),
//                     title: title || `플레이리스트#${prev.length + 1}`,
//                     cover: imagePreview ?? '/assets/basicPlaylist.png',
//                     tracks: [],
//                 };
//                 setDupState(false);
//                 return [...prev, newPlaylist];
//             }
//         });
//         setValue('title', '');
//     };
//     const onClose = () => {
//         setAddFormState(false);
//     };
//     useEffect(() => {
//         if (dupState) {
//             setAddFormState(true);
//         } else if (!dupState && dupState !== null) {
//             setAddFormState(false);
//             setLibraryState({ playlist: true, album: false });
//         }
//     }, [dupState]);

//     return (
//         <Container>
//             <Form onSubmit={handleSubmit(onValid)}>
//                 <FormTop>
//                     <FormTitle>플레이리스트 생성</FormTitle>
//                     <CloseBtn src="/assets/closeButton.png" alt="닫기" onClick={onClose} />
//                 </FormTop>
//                 <FormWrap>
//                     <FormLeft>
//                         <CoverWrap>
//                             <Cover src={imagePreview ?? '/assets/basicPlaylist.png'} alt="Preview"></Cover>
//                             <Overlay onClick={handleClick}>
//                                 <Message>사진 선택</Message>
//                             </Overlay>
//                         </CoverWrap>
//                         <Input
//                             type="file"
//                             ref={fileInputRef}
//                             onChange={handleFileChange}
//                             accept="image/*"
//                             style={{ display: 'none' }}
//                         />
//                     </FormLeft>
//                     <FormRight>
//                         <Title>이름</Title>
//                         <Input
//                             {...register('title', {
//                                 required: false,
//                                 maxLength: { value: 12, message: '12글자 이하로 입력해주세요' },
//                             })}
//                             type="text"
//                             placeholder="플레이리스트 이름을 작성해주세요"
//                         />

//                         <AlertMessage> {errors.title && errors.title.message}</AlertMessage>
//                     </FormRight>
//                 </FormWrap>
//                 <BtnWrap>
//                     <Btn type="submit">생성</Btn>
//                 </BtnWrap>
//             </Form>
//         </Container>
//     );
// };
