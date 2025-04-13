import { atom, selector } from 'recoil';
import { IPlaylist } from '../types/myPlaylist';
import { IMyAlbum } from '../types/myAlbums';
import { INowPlaying } from '../types/nowPlaying';
import { IPlayerTracks } from '../types/player';

export const setMobile = atom({
    key: 'isMobile',
    default: false,
});

export const addPlaylistState = atom({
    key: 'addPlaylistState',
    default: false,
});

export const playlistList = atom<IPlaylist[]>({
    key: 'playlistList',
    default: [],
});

export const playlistSelector = selector({
    // 내 플레이리스트 목록에 변화가 없으면 캐싱된 값을 넘기기 위해 생성
    key: 'playlistsSelector',
    get: ({ get }) => {
        const playlists = get(playlistList);
        return playlists;
    },
});

export const playlistSearch = selector({
    // 내 플레이리스트 목록에 변화가 없으면 캐싱된 값을 넘기기 위해 생성
    key: 'playlistSearch',
    get: ({ get }) => {
        const playlists = get(playlistList);
        return playlists;
    },
});

export const myAlbumList = atom<IMyAlbum[]>({
    key: 'myAlbumList',
    default: [],
});
export const clickPlaylistState = atom({
    key: 'clickPlaylistState',
    default: '',
});

export const selectPlaylist = selector({
    key: 'selectPlaylist',
    get: ({ get }) => {
        const playlists = get(playlistList);
        const clickPlaylist = get(clickPlaylistState);
        const select = playlists.find((playlist) => {
            return playlist.id === clickPlaylist;
        });
        return select;
    },
});

export const libraryState = atom({
    key: 'libraryState',
    default: { playlist: true, album: false },
});

export const searchFormState = atom({
    key: 'searchFormState',
    default: true,
});

export const playlistFixFormState = atom({
    key: 'playlistFixState',
    default: false,
});

export const deviceInfo = atom<string | null>({
    key: 'deviceInfo',
    default: null,
});

export const nowSongInfo = atom<INowPlaying>({
    key: 'nowSongInfo',
    default: { title: null, cover: '/assets/basicPlaylist.png', artist: null, is_playing: false },
});
export const checkFormState = atom({
    key: 'checkFormState',
    default: false,
});

export const playerTracks = atom<IPlayerTracks[]>({
    key: 'playerTracks',
    default: [],
});
export const playerTracksStorage = atom<IPlayerTracks[]>({
    key: 'playerTracksStorage',
    default: [],
});

export const playerPrevAndNext = atom<IPlayerTracks[]>({
    key: 'playerPrevAndNext',
    default: [],
});
interface IAlertState {
    requiredLogin: boolean;
    requiredPlaylist: boolean;
    addSong: boolean;
    duplicateSong: boolean;
}
export const alertFormState = atom<IAlertState>({
    key: 'alertFormState',
    default: {
        requiredLogin: false,
        requiredPlaylist: false,
        addSong: false,
        duplicateSong: false,
    },
});
export const gridState = atom({
    key: 'gridState',
    default: false,
});
export enum typeTransform {
    single = '싱글',
    album = '앨범',
}
