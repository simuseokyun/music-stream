import { getWebToken } from './getWebToken';

interface IAllAlbums {
    id: string;
    name: string;
    artists: { name: string }[];
    album_type: string;
    images: { url: string }[];
    release_date: string;
}

interface IArtistAlbumInfo {
    items: {
        id: string;
        name: string;
        artists: { name: string }[];
        album_type: string;
        images: { url: string }[];
        release_date: string;
    }[];
    next: string;
}

export const getAllAlbums = async (token: string, artistId: string) => {
    let allAlbums: IAllAlbums[] = [];
    let nextUrl: string | null = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`;
    while (nextUrl) {
        let response = await fetch(nextUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const newTokenData = await getWebToken();
            response = await fetch(nextUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${newTokenData.access_token}`,
                },
            });
        }
        const json: IArtistAlbumInfo = await response.json();
        allAlbums = [...allAlbums, ...json.items];
        nextUrl = json.next;
    }

    return allAlbums;
};
