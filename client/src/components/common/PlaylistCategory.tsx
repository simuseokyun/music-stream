import Loading from './Loading';
import { useViewportStore } from '../../store/common';
import Modal from './Modal';
import { useGetPlaylists } from '../../hooks/playlist/useGetPlaylists';
import useAddTrack from '../../hooks/track/useAddTrack';
export default function PlaylistCategory({ onClose }: { onClose: () => void }) {
    const isMobile = useViewportStore((state) => state.isMobile);
    const { data, isLoading, isError, isFetchingNextPage, ref } = useGetPlaylists();
    const { mutate: addTrack } = useAddTrack(onClose);

    if (isLoading) {
        return null;
    }
    if (isError || !data?.pages[0].items.length) {
        return (
            <div className="flex-1">
                <h1 className="text-center mt-20">목록을 불러 올 수 없습니다</h1>
            </div>
        );
    }
    return (
        <Modal onClose={onClose} modalTitle="플레이리스트 추가">
            <ul className="items-center">
                {data?.pages.map((page) =>
                    page?.items.map((item) => {
                        return (
                            <li
                                key={item.id}
                                className={`p-2 rounded-md cursor-pointer ${!isMobile && 'md:hover:bg-[#1a191a]'}`}
                                onClick={() => addTrack(item.id)}
                            >
                                {item.name}
                            </li>
                        );
                    })
                )}
            </ul>
            <div ref={ref} className="h-[10px]" />
        </Modal>
    );
}
