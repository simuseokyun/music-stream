import ActionButtons from './ActionButtons';
import ProgressBar from './ProgressBar';
import usePlayerControl from '../../hooks/player/usePlayerControl';
import { usePlayerStore } from '../../store/player';

export default function Player() {
    const { isPlaying, title, url, artist, image } = usePlayerStore();
    const { onToggle, onNext, onClickNext, onPrev } = usePlayerControl();
    return (
        <div
            className={`fixed w-full bg-[#1a191a] transition-all duration-300 ${!!url ? ' bottom-[40px] md:bottom-0' : 'bottom-[-80px]'} md:border-t-1 md:bg-main`}
        >
            <div className="w-full flex items-center p-2">
                <div className="flex items-center flex-1 min-w-0">
                    <img
                        className="w-[40px] h-[40px] md:img-medium  rounded-md shrink-0"
                        src={image ?? '/assets/playlist.svg'}
                        alt="앨범 커버"
                    />
                    <div className=" flex-1 min-w-0 ml-2">
                        <h1 className="text-sm font-semibold leading-none mb-1 truncate md:text-base ">{title}</h1>
                        <p className="text-[12px] text-sub truncate leading-none">{artist}</p>
                    </div>
                </div>
                <div className="flex-1">
                    <ActionButtons isPlaying={isPlaying} onToggle={onToggle} onNext={onClickNext} onPrev={onPrev} />
                    <ProgressBar isPlaying={isPlaying} onNext={onNext} url={url} />
                </div>
                <div className="md:flex-1" />
            </div>
        </div>
    );
}
