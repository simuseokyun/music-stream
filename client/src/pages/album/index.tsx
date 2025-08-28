import TrackList from '../../components/album/TrackList';
import AlbumInfo from '../../components/album/AlbumInfo';
import Loading from '../../components/common/Loading';
import useGetAlbumInfo from '../../hooks/album/useGetAlbumInfo';
export default function Album() {
    const { data, isLoading, isError, error } = useGetAlbumInfo();
    if (isLoading) {
        return <Loading />;
    }
    if (isError || !data) {
        return (
            <div className="flex-1">
                <h1 className="text-center mt-20">{error?.message}</h1>
            </div>
        );
    }
    return (
        <div className="flex-1 bg-black rounded-md mt-[60px] md:m-0 md:bg-main">
            <div className="relative md:p-[20px] rounded-md">
                <AlbumInfo />
                <TrackList data={data} />
                <p className="text-xs mt-10">{data?.copyrights[0]?.text}</p>
            </div>
        </div>
    );
}
