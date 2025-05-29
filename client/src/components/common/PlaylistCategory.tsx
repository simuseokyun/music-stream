import useCategoryState from '../../store/useCategoryState';
import { InfiniteData, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { IPlaylist } from '../../types/albumInfo';
import Loading from './Button/loading';
import fetchWithRefresh from '../../utils/fetchWithRefresh';
import useIsMobile from '../../store/useIsMobile';
import { PlaylistList } from '../../types/playlist/playlistList';
import Modal from '../Modal/Modal';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
export const PlaylistCategory = ({ onClose }: { onClose: () => void }) => {
    const { ref, inView } = useInView({ delay: 100, rootMargin: '100px' });
    const queryClient = useQueryClient();
    const isMobile = useIsMobile((state) => state.isMobile);

    const getPlaylists = async ({ pageParam = 0 }: { pageParam: number }) => {
        return await fetchWithRefresh(`${import.meta.env.VITE_SERVER_URI}/api/me/playlists?cursor=${pageParam}`);
    };
    const { isLoading, data, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
        PlaylistList,
        Error,
        InfiniteData<PlaylistList>,
        [string],
        number
    >({
        queryKey: ['playlists'],
        queryFn: getPlaylists,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const url = new URL(lastPage.next);
            const nextOffset = url.searchParams.get('offset');
            return Number(nextOffset);
        },
        staleTime: 0,
    });
    const { trackId, artistId, artistName, trackImage, trackTitle, setTrack } = useCategoryState();
    const addTrack = useMutation({
        mutationFn: async (playlistId: string) => {
            const data = await fetchWithRefresh(
                `${import.meta.env.VITE_SERVER_URI}/api/me/playlist/track/add/${playlistId}`,
                {
                    method: 'post',

                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        trackUri: `spotify:track:${trackId}`,
                    }),
                }
            );
            return { playlistId, data };
        },
        onSuccess(data) {
            const queryData = queryClient.getQueryData<InfiniteData<IPlaylist>>(['me', 'playlist', data.playlistId]);
            if (!queryData) {
                setTrack({ trackId: '', trackTitle: '', artistId: '', artistName: '', trackImage: '' });

                return;
            }
            const lastPage = queryData.pages.at(-1);
            if (!lastPage) return;
            const updatedLastPage = {
                ...lastPage,
                items: [
                    ...lastPage.items,
                    {
                        track: {
                            id: trackId,
                            name: trackTitle,
                            album: { images: [{ url: trackImage }], artists: [{ id: artistId, name: artistName }] },
                        },
                    },
                ],
            };

            const newData = {
                ...queryData,
                pages: [
                    ...queryData.pages.slice(0, -1), // 마지막 이전까지 유지
                    updatedLastPage, // 마지막 페이지만 업데이트
                ],
            };
            queryClient.setQueryData(['me', 'playlist', data.playlistId], newData);
            setTrack({ trackId: '', trackTitle: '', artistId: '', artistName: '', trackImage: '' });
        },
        onError() {},
        onSettled() {
            onClose();
        },
    });
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    if (isLoading) <Loading />;
    return (
        <Modal onClose={onClose} modalTitle="플레이리스트 추가">
            <ul className="items-center mb-[20px] ">
                {data?.pages.map((page) =>
                    page?.items.map((item) => {
                        return (
                            <li
                                key={item.id}
                                className={`p-2 rounded-md cursor-pointer ${!isMobile && 'hover:bg-[#1a191a]'}`}
                                onClick={() => addTrack.mutate(item.id)}
                            >
                                {item.name}
                            </li>
                        );
                    })
                )}
            </ul>
            {isFetchingNextPage && (
                <div className="text-center">
                    <img className="img-medium m-20 animate-spin" src="/assets/loading.png" alt="Loading..." />
                </div>
            )}
            <div ref={ref} className="h-[10px]" />
        </Modal>
    );
};
