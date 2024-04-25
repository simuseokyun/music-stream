import { atom, selector } from 'recoil';

export enum typeTransform {
    single = '싱글',
    album = '앨범',
    ep = 'EP',
}

export interface IPlaylist {
    id: string;
    title: string;
    img?: string;
    tracks: {
        id: string;
        title: string;
        duration_ms: number;
        cover: string;
        album_title: string;
        album_id: string;
        artists: { name: string; id: string }[];
    }[];
    top?: number;
}
export interface IAlbum {
    title: string;
    img?: string;
    name: string;
    id: string;
    // tracks: {
    //     id: string;
    //     title: string;
    //     duration_ms: number;

    //     album_title: string;
    //     artists: { name: string }[];
    // }[];
}

export const searchState = atom({
    key: 'searchState',
    default: '',
});

export const tokenValue = atom({
    key: 'tokenValue',
    default: '',
});
export const tokenValue2 = atom({
    key: 'tokenValue2',
    default: '',
});

export const addPlaylistState = atom({
    key: 'addPlaylistState',
    default: false,
});

export const playlistList = atom<IPlaylist[]>({
    key: 'playlistList',
    default: [],
});
export const saveAlbumList = atom<IAlbum[]>({
    key: 'saveAlbumList',
    default: [],
});
export const clickPlaylistState = atom({
    key: 'clickPlaylistState',
    default: '',
});

export const playlistFilter = selector({
    key: 'playlistFilter',
    get: ({ get }) => {
        const playLists = get(playlistList);
        const clickPlaylist = get(clickPlaylistState);
        const select = playLists.find((playlist) => {
            return playlist.id === clickPlaylist;
        });
        return select;
    },
});

export const clickMenuPlaylist = atom({
    key: 'playlistState',
    default: true,
});
export const clickMenuAlbum = atom({
    key: 'albumState',
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
