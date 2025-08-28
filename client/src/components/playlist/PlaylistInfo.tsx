import Loading from '../common/Loading';
import useDeletePlaylist from '../../hooks/playlist/useDeletePlaylist';
import useGetPlaylistInfo from '../../hooks/playlist/useGetPlaylistInfo';
export default function PlaylistInfo({ playlistId }: { playlistId?: string }) {
    const { data, isLoading, isError } = useGetPlaylistInfo(playlistId);
    const { mutate: onDelete } = useDeletePlaylist(playlistId);

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return null;
    }

    return (
        <div className="text-center border-b border-white/20 pb-5 md:flex md:items-end md:text-start ">
            <img className="w-[150px] rounded-md md:w-[200px]" src={data?.images?.[0]?.url ?? '/assets/playlist.svg'} />
            <div className="md:ml-4">
                <h1 className="hidden text-sm md:block md:text-base">플레이리스트</h1>
                <h1 className="text-2xl mt-4 font-bold md:text-[30px]">{data?.name}</h1>
                <p className="text-base text-sub mt-1">{data?.description}</p>
                <div className="mt-1 flex items-center justify-center md:justify-start">
                    <div className="mr-2">
                        <img className="rounded-full" src="/assets/user.svg" alt="유저 아이콘" />
                        <span className="text-sm ml-1">{data?.owner?.display_name}</span>
                    </div>
                    <button className="p-1 text-xs rounded-md border" onClick={() => onDelete()}>
                        플레이리스트 삭제
                    </button>
                </div>
                <span className="inline-block text-sub mt-2">총 {data?.tracks?.total}곡</span>
            </div>
        </div>
    );
}
