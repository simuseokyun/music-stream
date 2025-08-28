import { ActionButton } from '../../types/models/player.';
export default function ActionButtons({ isPlaying, onToggle, onNext, onPrev }: ActionButton) {
    return (
        <div className="flex justify-end items-center md:justify-center">
            <img className="action-button md:mr-2" src="/assets/prevButton.svg" alt="이전 아이콘" onClick={onPrev} />
            {!isPlaying ? (
                <img className="w-8 md:w-10" src="/assets/playButton.svg" alt="재생 아이콘" onClick={onToggle} />
            ) : (
                <img className="w-8 md:w-10" src="/assets/pauseButton.svg" alt="정지 아이콘" onClick={onToggle} />
            )}
            <img className="action-button md:ml-2" src="/assets/nextButton.svg" alt="다음 아이콘" onClick={onNext} />
        </div>
    );
}
