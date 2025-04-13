import styled from 'styled-components';
import { ArtistWrap, Dot } from '../../styles/common.style';
import { Link } from 'react-router-dom';

interface Props {
    artists: { name: string; id: string }[];
}
export const ArtistMap = ({ artists }: Props) => {
    return (
        <>
            {artists.map((artist, i) => {
                return (
                    <ArtistWrap key={artist.id}>
                        <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                        {artists.length == 1 ? undefined : artists[i + 1] ? <Dot>,</Dot> : undefined}
                    </ArtistWrap>
                );
            })}
        </>
    );
};
