import { useNavigate } from 'react-router-dom';
import FollowTab from './FollowTab';
import commaSeparate from '../../utils/common/commaSeparate';
import { SearchArtist } from '../../types/models/searchResult';
import useUserStore from '../../store/user';

export default function ArtistResult({ artist, isLoading, isError }: SearchArtist) {
    const navigate = useNavigate();
    const session = useUserStore((state) => state.user);
    const goArtist = () => {
        if (artist?.id) {
            navigate(`/artist/${artist?.id}`);
        }
    };
    if (isLoading) {
        return null;
    }
    if (isError || !artist) {
        return (
            <div className="flex p-5 items-center bg-[#1a191a] rounded-md">
                <img className="img-large object-cover rounded-full" src="/assets/user.svg" alt="아티스트 이미지" />
                <div className="ml-4">
                    <h1 className="text-2xl font-bold">아티스트를 찾을 수 없음</h1>
                    <p className="text-base text-sub leading-none">팔로워 : 0명</p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex p-5 items-center bg-[#1a191a] rounded-md cursor-pointer" onClick={goArtist}>
            <img
                className="w-[75px] h-[75px] md:img-large object-cover rounded-full"
                src={artist?.images?.[0]?.url || '/assets/user.svg'}
                alt="아티스트 이미지"
            />
            <div className="ml-4">
                <h1 className="text-2xl font-bold">{artist?.name}</h1>
                <p className="text-sm text-sub">팔로워 : {commaSeparate(artist?.followers?.total)} 명</p>
                {session && <FollowTab artist={artist} />}
            </div>
        </div>
    );
}
