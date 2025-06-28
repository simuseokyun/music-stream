import useGetPlaylistInfo from '../../hooks/playlist/useGetPlaylistInfo';
import Loading from '../common/Loading';
export default function PlaylistInfo({ playlistId }: { playlistId?: string }) {
    const { data: info, isLoading, isError } = useGetPlaylistInfo(playlistId);
    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return null;
    }
    return (
        <div className=" text-center md:flex md:items-end md:text-start border-b-1 border-white/20 pb-[20px]">
            <img
                className="w-[200px] h-[200px] rounded-[8px] md:w-[150px] md:h-[150px]"
                src={info?.images && info?.images[0] ? info?.images[0].url : '/assets/playlist.svg'}
                width={200}
                height={200}
            />
            <div className="md:ml-4">
                <h1 className="mb-2 mt-4 text-sm md:text-base md:mt-0">플레이리스트</h1>
                <h1 className="text-[24px] my-[4px] font-bold md:text-[30px] md:mt-0">{info?.name}</h1>
                <p className="my-[4px] text-sub text-sm md:text-base md:mt-0">{info?.description}</p>
                <div className="mb-2 md:mb-0">
                    <img className="mr-1 p-0.5 bg-[gray] rounded-full" src="/assets/user.svg" alt="user" />
                    <span className="text-sm">{info?.owner?.display_name}</span>
                </div>
            </div>
        </div>
    );
}
