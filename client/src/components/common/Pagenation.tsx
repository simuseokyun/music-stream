interface Pagenation {
    prev: () => void;
    next: () => void;
}
export default function Pagenation({ prev, next }: Pagenation) {
    return (
        <div className="text-right">
            <img
                className=" inline-block bg-transparent border-1 border-[#ffffff] p-1 rounded-full transition-all duration-200 hover:bg-[rgba(160,160,160,0.4)]"
                src="/assets/leftArrow.svg"
                alt="Prev"
                onClick={prev}
            ></img>
            <img
                className="w-[35px] h-[35px] inline-block bg-transparent border-1 border-[#ffffff]  p-1 rounded-full transition-all duration-200 ml-2 hover:bg-[rgba(160,160,160,0.4)]"
                src="/assets/rightArrow.svg"
                alt="Next"
                onClick={next}
            ></img>
        </div>
    );
}
