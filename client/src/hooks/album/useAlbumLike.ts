import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { addAlbum, deleteAlbum, checkAlbumLike } from '../../services/album/album';
import { MyAlbumListResponse } from '../../types/api/album';
import { AlbumTab } from '../../types/models/album';

export const useAlbumLike = ({ id, name, artistId, artistName, image }: AlbumTab) => {
    const [isLiked, setIsLiked] = useState(false);
    const { albumId } = useParams();
    const queryClient = useQueryClient();
    const checkAlbumState = async () => {
        if (!albumId) {
            setIsLiked(false);
            throw new Error('앨범 아이디가 필요합니다');
        }
        const cached = queryClient.getQueryData<InfiniteData<MyAlbumListResponse>>(['albums', 'following']);
        let liked = false;
        if (cached) {
            const album = cached?.pages.flatMap((page) => page.items).find(({ album }) => album.id === albumId);
            liked = !!album;
            setIsLiked(liked);
        } else {
            const result = await checkAlbumLike(albumId);
            liked = result?.liked === true;
            setIsLiked(liked);
        }
    };

    const { mutate: likedAlbum } = useMutation({
        mutationFn: () => {
            if (!albumId) throw new Error('앨범 아이디가 필요합니다');
            return addAlbum(albumId);
        },
        onMutate: () => {
            const cache = queryClient.getQueryData<InfiniteData<MyAlbumListResponse>>(['albums', 'following']);
            if (cache) {
                const newAlbum = {
                    album: {
                        id,
                        name,
                        artists: [{ id: artistId, name: artistName }],
                        images: [{ url: image }],
                    },
                };
                const firstPage = cache.pages[0];
                const restPages = cache.pages.slice(1);
                const myAlbums = {
                    ...cache,
                    pages: [
                        {
                            ...firstPage,
                            items: [newAlbum, ...firstPage.items],
                        },
                        ...restPages,
                    ],
                };
                queryClient.setQueryData(['albums', 'following'], myAlbums);
            }
            setIsLiked(true);
            return { data: cache };
        },
        onError: (_err, _variables, context) => {
            if (context?.data) {
                queryClient.setQueryData(['albums', 'following'], context.data);
                setIsLiked(false);
            }
        },
    });

    const { mutate: unLikedAlbum } = useMutation({
        mutationFn: () => {
            if (!albumId) throw new Error('앨범 아이디가 필요합니다');
            return deleteAlbum(albumId);
        },
        onMutate: () => {
            const cache = queryClient.getQueryData<InfiniteData<MyAlbumListResponse>>(['albums', 'following']);
            if (cache) {
                const filteredPages = cache.pages.map((page) => ({
                    ...page,
                    items: page.items.filter(({ album }) => album.id !== albumId),
                }));
                const myAlbums: InfiniteData<MyAlbumListResponse> = {
                    ...cache,
                    pages: filteredPages,
                };
                queryClient.setQueryData(['albums', 'following'], myAlbums);
            }
            setIsLiked(false);
            return { data: cache };
        },
        onError: (_err, _variables, context) => {
            if (context?.data) {
                queryClient.setQueryData(['albums', 'following'], context.data);
                setIsLiked(true);
            }
        },
    });

    useEffect(() => {
        checkAlbumState();
    }, []);

    return { isLiked, likedAlbum, unLikedAlbum };
};
