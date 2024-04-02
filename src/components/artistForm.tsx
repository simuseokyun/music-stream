import { useQuery } from 'react-query';
import { getArtist } from '../api';
import { useParams } from 'react-router-dom';
import { tokenValue } from '../atoms';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

interface IArtist {
    images: { height: number; width: number; url: string }[];
}
export const ArtistForm = () => {
    const { artistId } = useParams();
    const token = useRecoilValue(tokenValue);

    const ArtistImg = styled.img`
        width: 200px;
        height: 200px;
        border-radius: 200px;
    `;

    const { isLoading, data } = useQuery<IArtist>(['artist', artistId], async () => getArtist(token, artistId!));
    console.log(data);
    return <>{isLoading ? 'Loading...' : <ArtistImg src={data?.images[1].url} />}</>;
};
