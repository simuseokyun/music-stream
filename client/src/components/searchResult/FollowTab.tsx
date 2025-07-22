import { MouseEventHandler } from 'react';
import { useArtistFollow } from '../../hooks/artist/useArtistFollow';
import { Artist } from '../../types/api/artist';

export default function FollowTab({ artist }: { artist: Artist }) {
    const { isLoading, followState, follow, unFollow } = useArtistFollow(artist);
    const onFollow: MouseEventHandler = (e) => {
        e.stopPropagation();
        follow();
    };
    const onUnfollow: MouseEventHandler = (e) => {
        e.stopPropagation();
        unFollow();
    };
    if (isLoading) {
        return null;
    }
    return (
        <div className="mt-2">
            <button
                className={`transition text-sm font-bold  py-1 px-3  rounded-2xl text-black ${followState ? 'bg-white' : 'bg-accent'}`}
                onClick={followState ? onUnfollow : onFollow}
            >
                {followState ? '팔로우 중' : '팔로우'}
            </button>
        </div>
    );
}
