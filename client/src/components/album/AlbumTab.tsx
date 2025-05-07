import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
interface IAlbumTab {
    id: string;
    name: string;
    artist_name: string;
    artist_id: string;
    image: string;
}
interface Info {
    album: { id: string; images: { url: string }[]; name: string; artists: { id: string; name: string }[] };
    added_at: string;
}
interface IFollowingAlbums {
    items: Info[];
}
export const AlbumTab = ({ id, name, artist_name, artist_id, image }: IAlbumTab) => {
    const [isLiked, setIsLiked] = useState<null | boolean>(null);

    const { albumId } = useParams();
    const queryClient = useQueryClient();
    const 앨범찜확인 = async () => {
        const response = await fetch(`http://localhost:8000/api/me/albums/check?id=${albumId}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('찜 확인 에러');
        }
        const data = await response.json();
        return data; // [true] or [false]
    };

    const setAlbumState = async () => {
        const cached = queryClient.getQueryData<InfiniteData<IFollowingAlbums>>(['album', 'following']);
        let isLiked = false;
        if (cached) {
            // 'pages' 형태에서 데이터를 가져오기
            const album = cached.pages.flatMap((page) => page.items).find(({ album }) => album.id === albumId);
            isLiked = album ? true : false;
            setIsLiked(isLiked);
        } else {
            // 캐시 데이터가 없다면 서버에서 확인
            const result = await 앨범찜확인();
            isLiked = result?.[0] === true;
            setIsLiked(isLiked);
        }
    };

    const addAlbum = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:8000/api/me/albums/add`, {
                method: 'put',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: [albumId] }),
            });
            if (!response.ok) {
                throw new Error('앨범 추가 에러');
            }
            return response.json();
        },
        onMutate: async () => {
            const data = queryClient.getQueryData<InfiniteData<IFollowingAlbums>>(['album', 'following']);
            if (!data) {
                setIsLiked(true);
                return;
            }

            const newData = {
                ...data,
                pages: [
                    {
                        items: [
                            {
                                album: {
                                    id,
                                    name,
                                    artists: [{ id: artist_id, name: artist_name }],
                                    images: [{ url: image }],
                                },
                            },
                            ...data.pages[0].items,
                        ],
                    },
                    ...data.pages.slice(1), // 나머지 페이지는 그대로 유지
                ],
            };
            queryClient.setQueryData(['album', 'following'], newData);
            setIsLiked(true);
            return { data };
        },
        onError: (err, variables, context) => {
            if (context?.data) {
                queryClient.setQueryData(['album', 'following'], context.data);
                setIsLiked(false);
            }
        },
    });
    const deleteAlbum = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:8000/api/me/albums/delete`, {
                method: 'delete',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: [albumId] }),
            });

            if (!response.ok) {
                throw new Error('삭제 요청 실패');
            }

            return await response.json();
        },

        onMutate: async () => {
            const data = queryClient.getQueryData<InfiniteData<IFollowingAlbums>>(['album', 'following']);

            if (!data) {
                setIsLiked(false);
                return;
            }

            const newData: InfiniteData<IFollowingAlbums> = {
                ...data,
                pages: data.pages.map((page) => ({
                    ...page,
                    items: page.items.filter(({ album }) => album.id !== albumId),
                })),
            };

            queryClient.setQueryData(['album', 'following'], newData);
            setIsLiked(false);

            return { data };
        },

        onError: (err, variables, context) => {
            if (context?.data) {
                queryClient.setQueryData(['album', 'following'], context.data);
                setIsLiked(true);
            }
        },
    });

    useEffect(() => {
        setAlbumState();
    }, []);
    return (
        <>
            {isLiked ? (
                <button
                    className="p-1 text-xs bg-sub text-black rounded-md border-1"
                    onClick={() => deleteAlbum.mutate()}
                >
                    찜 해제
                </button>
            ) : (
                <button className="p-1 text-xs bg-main rounded-md border-1" onClick={() => addAlbum.mutate()}>
                    찜 하기
                </button>
            )}
        </>
    );
};
