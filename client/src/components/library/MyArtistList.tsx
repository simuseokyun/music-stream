import Loading from '../common/Loading';
import { useSortTabStore } from '../../store/library';
import useGetMyArtists from '../../hooks/artist/useGetMyArtists';
import ArtistItem from './MyArtistItem';

export default function ArtistList() {
    const sortState = useSortTabStore((state) => state.active);
    const { data, isLoading, isError } = useGetMyArtists();
    if (isLoading) {
        return <Loading />;
    }
    if (isError || !data) {
        return (
            <div className="w-full">
                <h1 className="text-center m-20">목록을 불러올 수 없습니다</h1>
            </div>
        );
    }
    if (!data?.artists.items.length) {
        return (
            <div className="w-full">
                <h1 className="text-center m-20">팔로우한 아티스트가 없습니다</h1>
            </div>
        );
    }

    return (
        <ul className={`w-full ${sortState === 'grid' ? 'grid grid-cols-3 lg:grid-cols-4' : ''}  mt-[10px]`}>
            {data?.artists.items.map((item) => <ArtistItem key={item?.id} artist={item} />)}
        </ul>
    );
}
