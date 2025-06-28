import { usePlayerStore } from '../../store/player';
import ActionButtons from './ActionButtons';
import ProgressBar from './ProgressBar';
import usePlayerControl from '../../hooks/player/usePlayerControl';
export default function Player() {
    const { isPlaying, title, url, artist, image } = usePlayerStore();
    const { playerControl, onNext, onPrev } = usePlayerControl();

    return (
        <div
            className={`w-full bg-[#1a191a] fixed ${!!url ? 'md:bottom-0 bottom-[50px]' : 'bottom-[-100px]'} transition-all duration-600 md:border-t-1 md:bg-main md:border-[#e2e2e2] `}
        >
            <div className="max-w-[1200px] p-[10px] mx-auto">
                <div className="flex items-center">
                    <div className="flex items-center flex-1 min-w-0">
                        <img
                            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-md shrink-0"
                            src={image || '/assets/playlist.svg'}
                            alt="앨범커버"
                        />
                        <div className="ml-2 flex-1 min-w-0">
                            <h1 className="truncate text-md md:text-base font-semibold">{title}</h1>
                            <p className="truncate text-[12px] text-sub">{artist}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <ActionButtons
                            isPlaying={isPlaying}
                            playerControl={playerControl}
                            onNext={onNext}
                            onPrev={onPrev}
                        />
                        <ProgressBar url={url} isPlaying={isPlaying} onPause={playerControl} onNext={onNext} />
                    </div>
                    <div className="md:flex-1" />
                </div>
            </div>
        </div>
    );
}
