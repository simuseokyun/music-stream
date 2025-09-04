import { MouseEventHandler } from 'react';
import { useArtistFollow } from '../../hooks/artist/useArtistFollow';
import { Artist } from '../../types/models/artist';

export default function FollowTab({ artist }: { artist: Artist }) {
    const { isLoading, followState, follow, unFollow } = useArtistFollow(artist);
    const onFollowToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        if (followState) {
            unFollow();
        } else {
            follow();
        }
    };
    if (isLoading) {
        return null;
    }
    return (
        <div className="mt-1">
            <button
                className={`text-[12px] px-2 py-2 text-black font-bold rounded-2xl  transition  ${followState ? 'bg-white' : 'bg-accent'} md:text-sm`}
                onClick={onFollowToggle}
            >
                {followState ? '팔로우 중' : '팔로우'}
            </button>
        </div>
    );
}
