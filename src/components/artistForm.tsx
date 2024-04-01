import { useQuery } from 'react-query';
import { getArtist } from '../api';
import { useParams } from 'react-router-dom';
import { tokenValue } from '../atoms';
import { useRecoilValue } from 'recoil';
export const ArtistForm = () => {
    const { artistId } = useParams();
    const token = useRecoilValue(tokenValue);

    const { isLoading, data } = useQuery(['artist', artistId], async () => getArtist(token, artistId!));
    console.log(artistId);
    console.log(token);
    return <h1>아이</h1>;
};
