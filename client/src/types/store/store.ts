import { PlayState } from '../models/player.';
import { User } from '../models/user';
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
    active: 'playlist' | 'album' | 'artist';
    setActive: (state: UseLibraryTab['active']) => void;
}
export interface UseSortTab {
    active: 'grid' | 'flex';
    setActive: (state: UseSortTab['active']) => void;
}

export interface UseModal {
    type: ModalType;
    open: (type: ModalType) => void;
    close: () => void;
}

export interface UsePlayer {
    isPlaying: boolean;
    title: string;
    artist: string;
    image: string;
    url: string;
    setPlayerState: (state: NowTrackInfo) => void;
    setIsPlaying: (state: boolean) => void;
}
export interface UseCurrentPlaylist {
    playlist: PlayState[];
    currentIndex: number;
    setIndex: (num: number) => void;
    setPlaylist: (state: PlayState[]) => void;
}
export interface UsePlayerKey {
    key: number;
    setKey: (value: number) => void;
}
export interface UseRequestForm {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}
interface NowTrackInfo {
    title: string;
    artist: string;
    image: string;
    url: string;
}

interface TrackInfo {
    trackId: string;
    trackTitle: string;
    trackImage: string;
    artistId: string;
    artistName: string;
}
interface AlbumInfo {
    id: string;
    name: string;
    artistId: string;
    artistName: string;
    image: string;
    type: string;
    trackLength: number;
}

type ModalType = 'addPlaylist' | 'selectPlaylist' | 'reqeustForm' | null;
