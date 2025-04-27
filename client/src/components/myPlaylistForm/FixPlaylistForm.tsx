import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectPlaylist, playlistFixFormState, playlistList } from '../../store/atoms';
import { Container, Form } from '../../styles/common.style';
import { Button } from '../common/buttonForm/Button';

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
        <div className="bg-black fixed w-full h-full z-10 flex justify-center items-center flex-col">
            <div className="max-w-[500px] p-[15px] w-[80%] rounded-[8px] bg-main">
                <div className="flex justify-between items-center mb-[20px]">
                    <h1>플레이리스트 생성</h1>
                    <img className="img-small" src="/assets/closeButton.png" alt="닫기" onClick={onClose} />
                </div>
                <form onSubmit={onEditTitle}>
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="relative w-[100px] h-[100px] overflow-hidden rounded-[8px] left-1/2 -translate-x-1/2">
                                <img
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    src={imagePreview ?? '/assets/basicPlaylist.png'}
                                    alt="Preview"
                                ></img>
                                <div
                                    className="absolute top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center"
                                    onClick={handleClick}
                                >
                                    <p className="text-xs text-center">사진 선택</p>
                                </div>
                            </div>
                            <input
                                className="hidden"
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                        <div className="w-full ml-[20px]">
                            <label htmlFor="name">이름</label>
                            <input
                                className="w-full inline-block bg-[#282828] rounded-xl p-1.5 text-sm mt-2"
                                id="name"
                                type="text"
                                placeholder="플레이리스트 이름을 작성해주세요"
                            />
                            {/* {dupState && <DupMessage>중복된 플레이리스트가 존재합니다</DupMessage>} */}
                        </div>
                    </div>
                </form>
                <div className="text-right mt-[20px]">
                    <button type="submit" className="p-[4px] px-[8px] ">
                        수정
                    </button>
                </div>
            </div>
        </div>
    );
};
