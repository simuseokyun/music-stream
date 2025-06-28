import { TrackResponse } from '../api/searchResult';
import { Track } from '../api/track';
import { PlayState } from '../models/player.';

export interface UseUser {
    user: User | null;
    setUser: (user: User | null) => void;
    clearUser: () => void;
    hydrated: boolean;
    setHydrated: (value: boolean) => void;
    resetHydrated: () => void;
}

export interface UseViewport {
    isMobile: boolean;
    setIsMobile: (state: boolean) => void;
}

export interface UseAlbumInfo extends AlbumInfo {
    setAlbumInfo: (state: AlbumInfo) => void;
}

export interface UseCategory extends TrackInfo {
    setTrack: (track: TrackInfo) => void;
}

export interface UseLibraryTab {
    active: 'playlist' | 'album';
    setActive: (state: 'playlist' | 'album') => void;
}
export interface UseSortTab {
    active: 'grid' | 'flex';
    setActive: (state: 'grid' | 'flex') => void;
}

export interface UseModal {
    type: ModalType;
    open: (type: ModalType) => void;
    close: () => void;
}

export interface UsePlayer {
    isPlaying: boolean;
    url: string;
    title: string;
    artist: string;
    image: string;
    setState: (state: NowPlayingInfo) => void;
    setIsPlaying: (state: boolean) => void;
}
export interface UseCurrentPlaylist {
    playlist: PlayState[];
    currentIndex: number;
    setIndex: (num: number) => void;
    setPlaylist: (state: PlayState[]) => void;
}
type NowPlayingInfo = {
    title: string;
    artist: string;
    url: string;
    image: string;
};
type ModalType = 'addPlaylist' | 'selectPlaylist' | null;
type TrackInfo = {
    trackId: string;
    trackTitle: string;
    trackImage: string;
    artistId: string;
    artistName: string;
};

type AlbumInfo = {
    id: string;
    name: string;
    artist_id: string;
    artist_name: string;
    image: string;
    type: string;
    track_length: number;
};
