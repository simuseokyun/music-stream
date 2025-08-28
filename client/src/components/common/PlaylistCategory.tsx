import Modal from './Modal';
import { useGetPlaylists } from '../../hooks/playlist/useGetPlaylists';
import useAddTrack from '../../hooks/track/useAddTrack';
import { useViewportStore } from '../../store/common';
export default function PlaylistCategory({ onClose }: { onClose: () => void }) {
    const { data, isLoading, isError, error, ref } = useGetPlaylists();
    const { mutate: addTrack } = useAddTrack(onClose);
    const isMobile = useViewportStore((state) => state.isMobile);
    if (isLoading) {
        return null;
    }
    if (isError || !data) {
        return (
            <div className="flex-1">
                <h1 className="text-center mt-20">{error?.message}</h1>
            </div>
        );
    }
    if (!data.pages[0].items?.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center mt-20">플레이리스트를 생성해주세요</h1>
            </div>
        );
    }

    return (
        <Modal onClose={onClose} modalTitle="플레이리스트 추가">
            <ul>
                {data?.pages.map((page) =>
                    page?.items.map((playlist) => {
                        return (
                            <li
                                key={playlist?.id}
                                className={`p-2 rounded-md ${!isMobile && 'md:hover:bg-[#1a191a]'}`}
                                onClick={() => addTrack(playlist?.id)}
                            >
                                {playlist?.name}
                            </li>
                        );
                    })
                )}
            </ul>
            <div ref={ref} className="h-[10px]" />
        </Modal>
    );
}
