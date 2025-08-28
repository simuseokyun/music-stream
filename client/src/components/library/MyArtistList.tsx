import ArtistItem from './MyArtistItem';
import Loading from '../common/Loading';
import useGetMyArtists from '../../hooks/artist/useGetMyArtists';
import { useSortTabStore } from '../../store/library';

export default function ArtistList() {
    const { data, isLoading, isError } = useGetMyArtists();
    const sortState = useSortTabStore((state) => state.active);
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
        <ul className={`w-full mt-2 ${sortState === 'grid' && 'grid grid-cols-3 lg:grid-cols-4'}`}>
            {data?.artists?.items.map((artist) => <ArtistItem key={artist?.id} artist={artist} />)}
        </ul>
    );
}
