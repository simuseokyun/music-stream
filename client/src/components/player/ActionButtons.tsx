interface ActionButtons {
    isPlaying: boolean;
    playerControl: () => void;
    onNext: () => void;
    onPrev: () => void;
}
export default function ActionButtons({ isPlaying, playerControl, onNext, onPrev }: ActionButtons) {
    return (
        <div className="flex justify-end items-center md:justify-center">
            <img className="img-small md:mr-2" src="/assets/prevButton.svg" alt="prev-button" onClick={onPrev} />
            {!isPlaying ? (
                <img
                    className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                    src="/assets/playButton.svg"
                    alt="play-button"
                    onClick={playerControl}
                />
            ) : (
                <img
                    className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                    src="/assets/pauseButton.svg"
                    alt="pause-button"
                    onClick={playerControl}
                />
            )}
            <img className="img-small md:ml-2" src="/assets/nextButton.svg" alt="next-button" onClick={onNext} />
        </div>
    );
}
