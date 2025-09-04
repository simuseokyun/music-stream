import Loading from '../common/Loading';
import commaSeparate from '../../utils/common/commaSeparate';
import useGetArtist from '../../hooks/artist/useGetArtist';
import FollowTab from '../searchResult/FollowTab';
import useUserStore from '../../store/user';
export default function ArtistImage({ artistId }: { artistId?: string }) {
    const { data, isLoading, isError } = useGetArtist(artistId);
    const session = useUserStore((state) => state.user);

    if (isLoading) {
        return <Loading />;
    }

    if (isError || !data || !artistId) {
        return (
            <div className="flex-1">
                <h1 className="text-center mt-20">아티스트를 찾을 수 없습니다</h1>
            </div>
        );
    }

    const { name, images, followers } = data;
    const artist = {
        id: artistId,
        name,
        images,
    };

    return (
        <div className="relative w-full h-[300px] rounded-md z-0 overflow-hidden">
            <img
                src={images[0]?.url || '/assets/user.svg'}
                className={`absolute w-full h-full top-0 left-0 ${images[0]?.url && 'object-cover'}`}
            />
            <div className="absolute w-full h-full  flex flex-col justify-end p-5 top-0 left-0 z-1">
                <h1 className="text-4xl font-bold">{name}</h1>
                <span className="my-1">팔로워 : {commaSeparate(followers.total)}명</span>

                {session && <FollowTab artist={artist} />}
            </div>
        </div>
    );
}
