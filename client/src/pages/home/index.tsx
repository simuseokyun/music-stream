import NewAlbumItem from '../../components/home/AlbumItem';
import Pagenation from '../../components/common/Pagenation';
import Loading from '../../components/common/Loading';
import { usePagenation } from '../../hooks/album/usePagenation';
import useGetNewAlbums from '../../hooks/album/useGetNewAlbums';
export default function Home() {
    const { data, isLoading, isError } = useGetNewAlbums();
    const { onNextBtn, onPrevBtn, index, offset } = usePagenation(data?.albums?.items.length || 0);

    if (isLoading) {
        return <Loading />;
    }
    if (isError || !data?.albums?.items.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">데이터를 불러올 수 없습니다</h1>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-3">
                <h1 className="text-2xl font-bold">최신 음악</h1>
                <Pagenation onPrev={onPrevBtn} onNext={onNextBtn} />
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-4">
                {data?.albums?.items
                    ?.slice(index * offset, (index + 1) * offset)
                    .map((item) => <NewAlbumItem key={item?.id} album={item} />)}
            </div>
        </div>
    );
}
