import styled from 'styled-components';
import { Button } from '../common/buttonForm/Button';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { myAlbumList, libraryState } from '../../store/atoms';
import { IGetAlbumInfo } from '../../types/albumInfo';
import { AlbumTab } from './AlbumTab';
import useAlbumInfo from '../../store/useAlbumInfo';
import { AlbumType } from '../../types/common';
export const AlbumInfo = () => {
    const { id, name, artist, image, type, track_length } = useAlbumInfo();

    console.log(name, id);
    return (
        <div className="text-center md:flex md:items-end md:text-start border-b-1 border-white/20 pb-[20px]">
            <img
                className="inline-block w-[200px] rounded-[8px] max-[768px]:w-[150px] max-[425px]:mx-auto"
                src={image}
            />
            <div className="md:ml-4">
                <span className="mb-2 hidden md:block">{AlbumType[type as keyof typeof AlbumType] ?? ''}</span>
                <h1 className="text-[24px] mt-2 my-[4px] font-bold  md:text-[30px] md:mt-0">{name}</h1>
                <div className="mb-2">
                    <Link className="md:hover:underline text-sub" to={`/artist/${id}`}>
                        {artist}
                    </Link>
                    <span className="text-sm mt-2 hidden md:block">{track_length}곡</span>
                </div>
                <AlbumTab title={name} artist={artist} cover={image} id={id} />
            </div>
        </div>
    );
};
