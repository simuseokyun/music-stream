import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { artistFollow, artistUnfollow } from '../../services/artist/artist';
import { checkArtistFollow } from '../../services/artist/artist';
import { MyArtistResponse } from '../../types/api/artist';
import { Artist } from '../../types/models/artist';
import useThrottledToast from '../common/useTrottledToast';
export const useArtistFollow = (artist: Artist) => {
    const [followState, setFollowState] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const toast = useThrottledToast();
    const queryClient = useQueryClient();
    const cached = queryClient.getQueryData<MyArtistResponse>(['artists', 'following']);

    const checkFollowState = async () => {
        if (!artist?.id) {
            setFollowState(false);
            setLoading(false);
            throw new Error('아티스트 아이디가 필요합니다');
        }
        let followed = false;
        if (cached) {
            const isArtist = cached?.artists?.items.find((item) => item.id === artist?.id);
            followed = !!isArtist;
        } else {
            const result = await checkArtistFollow(artist.id);
            followed = result?.following === true;
        }
        setFollowState(followed);
        setLoading(false);
    };
    const { mutate: follow } = useMutation({
        mutationFn: () => {
            if (!artist.id) throw new Error('아티스트 아이디가 필요합니다');
            return artistFollow(artist?.id);
        },
        onMutate() {
            const previousData = cached;
            const { id, name, images } = artist;
            if (cached) {
                const followedArtist = {
                    id,
                    name,
                    images,
                };
                const newList = {
                    artists: {
                        ...cached?.artists,
                        items: [followedArtist, ...(cached?.artists.items ?? [])],
                    },
                };
                queryClient.setQueryData(['artists', 'following'], newList);
            }
            setFollowState(true);
            toast('info', `${artist.name} 을 팔로우`);
            return { previousData };
        },
        onError(_error, _variables, context) {
            if (context?.previousData) {
                queryClient.setQueryData(['artists', 'following'], context.previousData);
            }
            setFollowState(false);
            toast('error', '오류가 발생했습니다');
        },
    });
    const { mutate: unFollow } = useMutation({
        mutationFn: () => {
            if (!artist.id) throw new Error('아티스트 아이디가 필요합니다');
            return artistUnfollow(artist?.id);
        },
        onMutate() {
            const previousData = cached;
            if (cached) {
                const newItems = cached?.artists.items.filter((item) => item.id !== artist.id);
                const newData = { artists: { items: newItems } };
                queryClient.setQueryData(['artists', 'following'], newData);
            }
            setFollowState(false);
            toast('info', `${artist.name} 팔로우 해제`);
            return { previousData };
        },
        onError(_error, _variables, context) {
            if (context?.previousData) {
                queryClient.setQueryData(['artists', 'following'], context.previousData);
            }
            setFollowState(true);
            toast('error', '오류가 발생했습니다');
        },
    });
    useEffect(() => {
        checkFollowState();
    }, []);
    return { isLoading, followState, follow, unFollow };
};
