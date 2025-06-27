import commaSeparate from '../../utils/common/commaSeparate';
import Loading from '../common/Loading';
import useGetArtist from '../../hooks/artist/useGetArtist';
export default function ArtistImage({ artistId }: { artistId?: string }) {
    const { data, isLoading, isError } = useGetArtist(artistId);
    if (isLoading) {
        return <Loading />;
    }

    if (isError || !data) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">아티스트를 찾을 수 없습니다</h1>
            </div>
        );
    }

    const { name, images, followers } = data;

    return (
        <div className="relative w-full h-[300px] rounded-[8px] overflow-hidden md:h-[400px]">
            <img
                src={images[0]?.url || '/assets/user.svg'}
                className={`absolute w-full h-full top-0 left-0 ${images.length && 'object-cover'}`}
            />
            <div className="absolute flex flex-col justify-end p-[20px] w-full h-full top-0 left-0 z-10">
                <h1 className="font-bold text-4xl">{name}</h1>
                <span>팔로워 : {commaSeparate(followers.total)}명</span>
            </div>
        </div>
    );
}
