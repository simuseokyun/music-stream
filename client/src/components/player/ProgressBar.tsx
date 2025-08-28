import { useState, useRef, ChangeEventHandler } from 'react';
import ReactPlayer from 'react-player';
import { Player } from '../../types/models/player.';
import { usePlayerKey } from '../../store/common';

export default function ProgressBar({ url, isPlaying, onNext }: Player) {
    const [played, setPlayed] = useState(0);
    const playerRef = useRef<ReactPlayer>(null);
    const { key } = usePlayerKey();
    const onPregrss = ({ played }: { played: number }) => {
        const value = Number(played.toFixed(2));
        setPlayed(value);
    };
    const setProgress: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = parseFloat(e.target.value);
        setPlayed(value);
        playerRef?.current?.seekTo(value);
    };

    return (
        <div className="hidden md:block">
            <ReactPlayer
                key={url + key}
                url={url}
                ref={playerRef}
                width={0}
                height={0}
                playing={isPlaying}
                controls={false}
                onEnded={onNext}
                onProgress={onPregrss}
            />
            <div className="relative w-full h-[2px] rounded-[10px] bg-[#2a292a] md:mt-2">
                <div
                    className="absolute top-0 left-0 h-full bg-white rounded-[10px] "
                    style={{ width: `${played * 100}%` }}
                />
                <input
                    className="absolute top-0 left-0 w-full bg-transparent cursor-pointer"
                    type="range"
                    min="0"
                    max="0.999999"
                    step="any"
                    value={played}
                    onChange={setProgress}
                />
            </div>
        </div>
    );
}
