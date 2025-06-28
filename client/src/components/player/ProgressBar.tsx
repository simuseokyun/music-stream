import ReactPlayer from 'react-player';
import { useState, useRef } from 'react';
import { Player } from '../../types/models/player.';

export default function ProgressBar({ url, isPlaying, onPause, onNext }: Player) {
    const [played, setPlayed] = useState(0);
    const playerRef = useRef<ReactPlayer>(null);

    return (
        <div className="hidden md:block">
            <ReactPlayer
                // key={url}
                url={url}
                ref={playerRef}
                width={0}
                height={0}
                playing={isPlaying}
                controls={false}
                onEnded={onNext}
                onProgress={({ played }) => setPlayed(played)}
            />
            <div className="relative w-full h-[2px] rounded-[10px] bg-[#2a292a] md:mt-2">
                <div
                    className="absolute top-0 left-0 h-full bg-white bg-rounded-[10px] pointer-events-none"
                    style={{ width: `${played * 100}%` }}
                />
                <input
                    className="absolute top-0 left-0 w-full  appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none"
                    type="range"
                    min="0"
                    max="0.999999"
                    step="any"
                    value={played}
                    onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setPlayed(value);
                        playerRef?.current?.seekTo(value);
                    }}
                />
            </div>
        </div>
    );
}
