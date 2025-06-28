import NewAlbumItem from './AlbumItem';
import { usePagenation } from '../../hooks/album/usePagenation';
import Pagenation from '../common/Pagenation';
import Loading from '../common/Loading';
import useGetNewAlbums from '../../hooks/album/useGetNewAlbums';
export default function NewAlbum() {
    const { data, isLoading, isError } = useGetNewAlbums();
    const { onNextBtn, onPrevBtn, index, offset } = usePagenation(data?.albums?.items.length || 0);

    if (isLoading) {
        return <Loading />;
    }
    if (isError || !data?.albums.items.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">데이터를 불러올 수 없습니다</h1>
            </div>
        );
    }

    const {
        albums: { items },
    } = data;
    return (
        <div className="flex-1 rounded-md ">
            <div className="flex justify-between items-center mb-[10px]">
                <h1 className="text-2xl font-bold">최신 음악</h1>
                <Pagenation prev={onPrevBtn} next={onNextBtn} />
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-4">
                {items
                    ?.slice(index * offset, (index + 1) * offset)
                    .map(({ id, name, artists, images }) => (
                        <NewAlbumItem key={id} id={id} name={name} artist={artists[0]?.name} cover={images[0]?.url} />
                    ))}
            </div>
        </div>
    );
}
