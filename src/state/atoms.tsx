import { atom, selector } from 'recoil';
import { IPlaylist } from '../types/myPlaylist';
import { IMyAlbum } from '../types/myAlbums';
import { INowPlaying } from '../types/nowPlaying';

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

export const libraryPliState = atom({
    key: 'plibraryPliState',
    default: true,
});
export const libraryAlbumState = atom({
    key: 'libraryAlbumState',
    default: false,
});

export const openSearch = atom({
    key: 'openSearch',
    default: false,
});

export const titleChangeState = atom({
    key: 'titleChangeState',
    default: false,
});

export const playlistFixState = atom({
    key: 'playlistFixState',
    default: false,
});

export const deviceInfo = atom<string | null>({
    key: 'device_id',
    default: null,
});

export const nowSongInfo = atom<INowPlaying>({
    key: 'nowSongInfo',
    default: { title: '', cover: '', artist: '', is_playing: false },
});

export enum typeTransform {
    single = '싱글',
    album = '앨범',
}
