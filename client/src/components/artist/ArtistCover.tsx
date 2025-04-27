import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { commaSeparate } from '../../utils/commaSeparate';
import { getLocalStorage } from '../../utils/getLocalStorage';
import { getArtist } from '../../api/getInfo';
import { IArtistInfo } from '../../types/artistInfo';
import { Loading, LoadingWrap } from '../../styles/common.style';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    @media (max-width: 425px) {
        height: 200px;
    }
`;
const Cover = styled.div<{ $img: string }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url(${({ $img }) => $img});
    background-position: center;
    background-size: cover;
    opacity: 0.7;
`;
const Overlay = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 20px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    @media (max-width: 425px) {
        padding: 10px;
    }
`;
const Artist = styled.h1`
    font-size: 36px;
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 24px;
    }
    @media (max-width: 425px) {
        font-size: 20px;
    }
`;
const Follower = styled.span`
    font-size: 18px;
    margin-top: 10px;
    @media (max-width: 425px) {
        font-size: 14px;
    }
`;
export const ArtistCover = () => {
    const token = getLocalStorage('webAccessToken');
    const { artistId } = useParams();
    const { isLoading, data, isError } = useQuery<IArtistInfo>({
        queryKey: ['artistCover', artistId],
        queryFn: async () => {
            if (artistId && token) {
                const artistData = await getArtist(token, artistId);
                return artistData;
            } else {
                return Promise.resolve(null);
            }
        },
    });
    if (isLoading) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <img className="img-medium m-20 animate-spin" src="/assets/loading.png" />
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">아티스트를 찾을 수 없습니다</h1>
            </div>
        );
    }
    if (!data) {
        return (
            <div className="flex-1">
                <h1 className="text-center m-20">아티스트를 찾을 수 없습니다</h1>
            </div>
        );
    }
    console.log(data);
    const { name, images, followers } = data;
    return (
        <div className="relative w-full h-[300px] rounded-[8px] overflow-hidden md:h-[400px]">
            <img src={images[0].url} className="absolute w-full h-full top-0 left-0 object-cover" />
            <div className="absolute flex flex-col justify-end p-[20px] w-full h-full top-0 left-0">
                <h1 className="font-bold text-4xl">{name}</h1>
                <span>팔로워 : {commaSeparate(followers.total)}명</span>
            </div>
        </div>
    );
};
