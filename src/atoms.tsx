import { atom } from 'recoil';

export enum typeTransform {
    single = '싱글',
    album = '앨범',
    ep = 'EP',
}

export interface IPlaylist {
    id: string;
    title: string;
    img?: string;
}

export const searchState = atom({
    key: 'searchState',
    default: '',
});

export const tokenValue = atom({
    key: 'tokenValue',
    default: '',
});

export const addPlaylistState = atom({
    key: 'addPlaylistState',
    default: false,
});

export const playlistList = atom<IPlaylist[]>({
    key: 'playlistList',
    default: [{ id: '아이디', title: '플레이리스트 제목', img: '' }],
});
