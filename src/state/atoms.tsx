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
    key: 'libraryPliState',
    default: true,
});
export const libraryAlbumState = atom({
    key: 'libraryAlbumState',
    default: false,
});

export const searchFormState = atom({
    key: 'searchFormState',
    default: false,
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
    default: { title: '', cover: '/images/basicPlaylist.png', artist: '', is_playing: false },
});
export const checkFormState = atom({
    key: 'checkFormState',
    default: false,
});

export const playerTracks = atom<IPlayerTracks[]>({
    key: 'playerTracks',
    default: [],
});

export const playerPrevAndNext = atom<IPlayerTracks[]>({
    key: 'playerPrevAndNext',
    default: [],
});
export enum typeTransform {
    single = '싱글',
    album = '앨범',
}
