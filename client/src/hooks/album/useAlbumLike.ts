import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from '../../services/api/client';

interface Info {
    album: { id: string; images: { url: string }[]; name: string; artists: { id: string; name: string }[] };
    added_at: string;
}
interface IFollowingAlbums {
    items: Info[];
}

export const useAlbumLike = (id: string, name: string, artist_name: string, artist_id: string, image: string) => {
    const [isLiked, setIsLiked] = useState<null | boolean>(null);
    const { albumId } = useParams();
    const queryClient = useQueryClient();

    const checkAlbumLike = async () => {
        const data = await fetchWithAuth(`/api/me/albums/check?id=${albumId}`);
        return data;
    };

    const setAlbumState = async () => {
        const cached = queryClient.getQueryData<InfiniteData<IFollowingAlbums>>(['album', 'following']);
        let liked = false;
        if (cached) {
            const album = cached.pages.flatMap((page) => page.items).find(({ album }) => album.id === albumId);
            liked = !!album;
            setIsLiked(liked);
        } else {
            const result = await checkAlbumLike();
            liked = result?.[0] === true;
            setIsLiked(liked);
        }
    };

    const addAlbum = useMutation({
        mutationFn: async () => {
            await fetchWithAuth(`/api/me/albums/add`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                data: { ids: [albumId] },
            });
        },
        onMutate: () => {
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
        mutationFn: async () => {
            await fetchWithAuth(`/api/me/albums/delete`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                data: { ids: [albumId] },
            });
        },
        onMutate: () => {
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

    return { isLiked, addAlbum, deleteAlbum };
};
