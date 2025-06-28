import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { MyAlbumListResponse } from '../../types/api/album';
import { addAlbum as onAddAlbum, deleteAlbum as onDeleteAlbum, checkAlbumLike } from '../../services/album/album';

export const useAlbumLike = (id: string, name: string, artist_name: string, artist_id: string, image: string) => {
    const [isLiked, setIsLiked] = useState<null | boolean>(null);
    const { albumId } = useParams();
    const queryClient = useQueryClient();

    const setAlbumState = async () => {
        if (!albumId) {
            setIsLiked(null);
            return;
        }
        const cached = queryClient.getQueryData<InfiniteData<MyAlbumListResponse>>(['album', 'following']);
        let liked = false;
        if (cached) {
            const album = cached?.pages.flatMap((page) => page.items).find(({ album }) => album.id === albumId);
            liked = !!album;
            setIsLiked(liked);
        } else {
            const result = await checkAlbumLike(albumId);
            liked = result?.[0] === true;
            setIsLiked(liked);
        }
    };

    const addAlbum = useMutation({
        mutationFn: () => {
            if (!albumId) return Promise.reject('앨범 아이디 필요');
            return onAddAlbum(albumId);
        },
        onMutate: () => {
            const data = queryClient.getQueryData<InfiniteData<MyAlbumListResponse>>(['album', 'following']);
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
                    ...data.pages.slice(1),
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
        mutationFn: () => {
            if (!albumId) return Promise.reject('앨범 아이디 필요');
            return onDeleteAlbum(albumId);
        },
        onMutate: () => {
            const data = queryClient.getQueryData<InfiniteData<MyAlbumListResponse>>(['album', 'following']);
            if (!data) {
                setIsLiked(false);
                return;
            }
            const newData: InfiniteData<MyAlbumListResponse> = {
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

    return { isLiked, addAlbum, deleteAlbum };
};
