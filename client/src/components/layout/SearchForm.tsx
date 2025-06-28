import { SearchInput } from '../searchResult/SearchInput';
import { useViewportStore } from '../../store/common';
export default function Search() {
    const isMobile = useViewportStore((state) => state.isMobile);
    if (!isMobile) return null;
    return (
        <div>
            <h1 className="text-center text-2xl font-bold mb-2">검색하기</h1>
            <SearchInput />
        </div>
    );
}
