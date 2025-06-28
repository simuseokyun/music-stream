import TrackList from '../../components/album/TrackList';
import AlbumInfo from '../../components/album/AlbumInfo';
import Loading from '../../components/common/Loading';
import useGetAlbumInfo from '../../hooks/album/useGetAlbumInfo';
export default function Album() {
    const { data, isLoading, isError } = useGetAlbumInfo();
    if (isLoading) {
        return <Loading />;
    }
    if (isError || !data) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">앨범 데이터를 불러올 수 없습니다</h1>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-black rounded-[8px] mt-[60px] md:m-0 md:bg-main">
            <div className="relative md:p-[20px] rounded-t-[8px]">
                <AlbumInfo />
                <TrackList data={data} />
                <p className="text-xs mt-10">{data?.copyrights[0].text}</p>
            </div>
        </div>
    );
}
