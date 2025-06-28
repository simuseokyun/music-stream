import commaSeparate from '../../utils/common/commaSeparate';
import { useNavigate } from 'react-router-dom';
import { SearchArtist } from '../../types/models/searchResult';
export default function ArtistResult({ artist, isLoading, isError }: SearchArtist) {
    const navigate = useNavigate();
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
            <div className="flex justify-left p-[20px] items-center bg-[#1a191a] rounded-md my-[20px] cursor-pointer">
                <img
                    className="w-[120px] h-[120px] object-cover rounded-full"
                    src="/assets/user.svg"
                    alt="아티스트 이미지"
                />
                <div className="ml-4">
                    <h1 className="text-2xl font-bold">아티스트를 찾을 수 없음</h1>
                    <p className="text-base text-sub">팔로워 : 0명</p>
                </div>
            </div>
        );
    }
    return (
        <div
            className="flex justify-left p-[20px] items-center bg-[#1a191a] rounded-md my-[20px] cursor-pointer"
            onClick={goArtist}
        >
            <img
                className="w-[120px] h-[120px] object-cover rounded-full"
                src={artist?.images?.[0]?.url}
                alt="아티스트 이미지"
            />
            <div className="ml-4">
                <h1 className="text-2xl font-bold">{artist?.name}</h1>
                <p className="text-base text-sub">팔로워 : {commaSeparate(artist?.followers?.total)} 명</p>
            </div>
        </div>
    );
}
