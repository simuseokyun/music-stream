import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAllAlbums } from '../../api';
import { useRecoilValue } from 'recoil';
import { setMobile, typeTransform } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { getTokenLocalStorage } from '../../util';

const Container = styled.div`
    width: 100%;
    padding: 20px 20px 60px 20px;
    background: #131212;
    border-radius: 8px;
    @media (max-width: 768px) {
        padding: 50px 10px 110px 10px;
    }
`;
const SectionTitle = styled.h1`
    font-size: 20px;
    margin-bottom: 10px;
`;
const AlbumWrap = styled.ul<{ state: string }>`
    width: 100%;
    display: grid;
    grid-template-columns: ${({ state }) => `repeat(${state === 'true' ? 3 : 4}, 1fr)`};
    gap: 10px;
`;
const AlbumList = styled.li`
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    padding: 10px;
    &:hover {
        background-color: #1a191a;
    }
    @media (max-width: 768px) {
        padding: 5px;
    }
`;
const AlbumTitle = styled.h1`
    font-size: 16px;
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const AlbumImg = styled.img`
    width: 100%;
    border-radius: 8px;
`;
const AlbumReleaseWrap = styled.div`
    margin-top: 3px;
`;
const AlbumRelease = styled.span`
    color: rgb(160, 160, 160);
    font-size: 14px;
`;
const AlbumType = styled.span`
    color: rgb(160, 160, 160);
    margin-left: 3px;
    font-size: 14px;
`;
export const AllAlbum = () => {
    const token = getTokenLocalStorage('webAccessToken') || '';
    const { artistId } = useParams();
    const navigate = useNavigate();
    const { isLoading, data: allAlbumList } = useQuery('albumList', async () => {
        const response = await getAllAlbums(token, artistId!);
        return response;
    });
    const isMobile = useRecoilValue(setMobile);
    return (
        <Container>
            <SectionTitle>모든 앨범</SectionTitle>
            <AlbumWrap state={isMobile.toString()}>
                {allAlbumList &&
                    allAlbumList.map((album) => (
                        <AlbumList
                            key={album.id}
                            onClick={() => {
                                navigate(`/home/album/${album.id}`);
                            }}
                        >
                            <AlbumImg src={album.images[0].url} />
                            <AlbumTitle>{album.name}</AlbumTitle>
                            <AlbumReleaseWrap>
                                <AlbumRelease>{album.release_date.slice(0, 4)}</AlbumRelease>
                                <AlbumType>
                                    {album.album_type === 'album' ? typeTransform.album : typeTransform.single}
                                </AlbumType>
                            </AlbumReleaseWrap>
                        </AlbumList>
                    ))}
            </AlbumWrap>
        </Container>
    );
};
