import { Pagenation as PagenationProps } from '../../types/models/layout';
export default function Pagenation({ onPrev, onNext }: PagenationProps) {
    return (
        <div className="text-right">
            <img
                className="inline-block bg-transparent border border-[#ffffff] rounded-full transition-all duration hover:bg-[rgba(160,160,160,0.4)]"
                src="/assets/leftArrow.svg"
                alt="이전 아이콘"
                onClick={onPrev}
            ></img>
            <img
                className="inline-block bg-transparent border border-[#ffffff] rounded-full transition-all duration ml-2 hover:bg-[rgba(160,160,160,0.4)]"
                src="/assets/rightArrow.svg"
                alt="다음 아이콘"
                onClick={onNext}
            ></img>
        </div>
    );
}
