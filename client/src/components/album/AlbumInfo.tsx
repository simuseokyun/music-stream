import styled from 'styled-components';
import { Button } from '../common/buttonForm/Button';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { myAlbumList, libraryState } from '../../store/atoms';
import { IGetAlbumInfo } from '../../types/albumInfo';
import { AlbumTab } from './AlbumTab';

const Description = styled.div`
    margin-left: 20px;
    @media (max-width: 425px) {
        margin: 10px 0 0;
    }
`;
const Title = styled.h1`
    font-size: 40px;
    font-weight: 700;
    margin: 5px 0;
    @media (max-width: 768px) {
        font-size: 20px;
    }
`;
const Artist = styled.span``;
const ReleaseYear = styled.span`
    margin-left: 10px;
`;
const TrackLength = styled(ReleaseYear)``;
const Info = styled.div`
    margin-bottom: 10px;
`;
const Type = styled.p``;

export const AlbumInfo = ({ title, type, year, trackLength, artist }: IGetAlbumInfo) => {
    return (
        <>
            <Type>{type}</Type>
            <Title>{title}</Title>
            <Info>
                <Artist>
                    <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                </Artist>
                <ReleaseYear>{year}</ReleaseYear>
                <TrackLength>{trackLength}곡</TrackLength>
            </Info>
        </>
    );
};
