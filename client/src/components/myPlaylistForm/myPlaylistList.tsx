import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { gridState, playlistList } from '../../store/atoms';
import {} from '../../styles/common.style';
import { MyPlaylistItem } from './myPlaylistItem';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useGridTab } from '../../store/useLibraryTab';

interface IMyPlaylists {
    items: { id: string; name: string; images: { url: string }[]; owner: { display_name: string } }[];
}

export const MyPlaylistList = () => {
    const onGrid = useGridTab((state) => state.active);
    const getPlaylists = async () => {
        const response = await fetch('http://localhost:8000/api/me/playlists', {
            method: 'get',
            credentials: 'include',
        });
        console.log(response);
        if (!response.ok) throw new Error('에러');
        return await response.json();
    };
    const { isLoading, data, isError } = useQuery<IMyPlaylists>({ queryKey: ['playlists'], queryFn: getPlaylists });

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center">
                <img className="img-medium m-20 animate-spin" src="/assets/loading.png" alt="Loading..." />
            </div>
        );
    }
    if (isError || !data) {
        return (
            <div className="w-full">
                <h1 className="text-center m-20">데이터를 불러올 수 없습니다</h1>
            </div>
        );
    }
    return (
        <ul className={`w-full ${onGrid === 'grid' ? 'grid grid-cols-3 lg:grid-cols-4' : ''}  mt-[10px]`}>
            {data?.items ? (
                data?.items?.map(({ id, name, images, owner }) => {
                    return (
                        <MyPlaylistItem
                            key={id}
                            id={id}
                            name={name}
                            image={images && images[0].url}
                            grid={onGrid}
                            owner={owner.display_name}
                        />
                    );
                })
            ) : (
                <h1 className="my-[50px] text-center">플레이리스트 목록이 없습니다</h1>
            )}
        </ul>
    );
};
