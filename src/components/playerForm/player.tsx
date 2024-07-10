import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { deviceInfo, nowSongInfo, playerPrevAndNext } from '../../state/atoms';
import { useEffect, useRef, useState } from 'react';
import { useToggleSong, getLocalStorage, setLocalStorage, usePlayMusic, durationTransform } from '../../utils/util';
import * as S from './player.style';
import { refreshToken } from '../../api/api';

export const Player = () => {
    const setDevice = useSetRecoilState(deviceInfo);
    const sdkToken = getLocalStorage('sdkAccessToken');
    const [song, setSong] = useRecoilState(nowSongInfo);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const playMusic = usePlayMusic();
    const useToggle = useToggleSong();
    const { toggleSong } = useToggle;
    const prevAndNext = useRecoilValue(playerPrevAndNext);

    const prev = () => {
        if (Object.keys(prevAndNext[0]).length) {
            playMusic(
                prevAndNext[0].uri,
                prevAndNext[0].title,
                prevAndNext[0].cover,
                prevAndNext[0].name,
                prevAndNext[0].playTime
            );
        } else {
            alert('이전 항목이 없습니다');
        }
    };

    const next = () => {
        if (Object.keys(prevAndNext[1]).length) {
            playMusic(
                prevAndNext[1].uri,
                prevAndNext[1].title,
                prevAndNext[1].cover,
                prevAndNext[1].name,
                prevAndNext[1].playTime
            );
        } else {
            alert('다음 항목이 없습니다');
        }
    };

    // * 노래 제목 길면 애니메이션 작동
    useEffect(() => {
        if (textRef.current && divRef.current) {
            setShouldAnimate(textRef.current.clientWidth > divRef.current.clientWidth - 50);
        }
    }, [song.title]);
    return (
        <>
            <S.Container song={song.title}>
                <S.Wrap>
                    <S.PlayerForm>
                        <S.PlayerLeft ref={divRef}>
                            <S.Cover src={song.cover} />
                            <S.Info>
                                <S.Title ref={textRef} shouldAnimate={shouldAnimate}>
                                    {song.title}
                                </S.Title>
                                <S.Artists>{song.artist}</S.Artists>
                            </S.Info>
                        </S.PlayerLeft>
                        <S.PlayerCenter>
                            <S.SetPlayer>
                                <S.PrevBtn src="/images/previousBtn.png" onClick={prev} />
                                {song.is_playing ? (
                                    <S.StopBtn src="/images/stopBtn.png" onClick={toggleSong} />
                                ) : (
                                    <S.PlayBtn src="/images/playBtn.png" onClick={toggleSong} />
                                )}
                                <S.NextBtn src="/images/nextBtn.png" onClick={next} />
                            </S.SetPlayer>
                            {/* <S.PlayerTimer></S.PlayerTimer> */}
                        </S.PlayerCenter>
                        <S.PlayerRight></S.PlayerRight>
                    </S.PlayerForm>
                </S.Wrap>
            </S.Container>
        </>
    );
};
