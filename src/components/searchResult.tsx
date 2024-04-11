import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { searchState, tokenValue } from '../atoms';
import { searchTrack } from '../api';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface ITracks {
    tracks: {
        items: IAlbum[];
        next: string;
    };
}

interface IAlbum {
    album: {
        images: {
            url: string;
        }[];
        id: string;
        name: string;
        artists: { name: string; id: string }[];
    };
    name: string;
}
const TrackList = styled.tr`
    width: 100%;

    margin-top: 20px;
    &:first-child {
        margin: 0;
    }
`;
const TrackImg = styled.div<{ url: string }>`
    background-image: url(${(props) => props.url});
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background-position: center;
    background-size: cover;
`;
const TrackTitle = styled.td`
    margin-left: 20px;
    text-overflow: ellipsis;
`;
const AlbumTitle = styled.td`
    margin-left: 20px;
`;
export const SearchResult = () => {
    const search = useRecoilValue(searchState);
    const token = useRecoilValue(tokenValue);
    // const { trackId } = useParams();
    const { isLoading: TrackLoading, data: trackData } = useQuery<ITracks>(['searchTrack', search], async () => {
        const trackData = await searchTrack(token, search);
        return trackData;
    });
    console.log(trackData);
    return (
        <div style={{ padding: '20px' }}>
            <table style={{ width: '100%', verticalAlign: 'middle' }}>
                <tr>
                    <th>앨범 커버</th>
                    <th>노래 제목</th>
                    <th>앨범 제목</th>
                </tr>

                {TrackLoading
                    ? 'Loading...'
                    : trackData?.tracks?.items?.map((item, i) => {
                          return (
                              <TrackList key={i}>
                                  <td>
                                      <TrackImg url={item.album.images[0].url} />
                                  </td>
                                  <TrackTitle>
                                      {item.name}
                                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
                                          {item.album.artists.map((artist, i) => {
                                              return (
                                                  <p>
                                                      <Link
                                                          style={{ fontSize: '14px', color: '#a0a0a0' }}
                                                          to={`/artist/${artist.id}`}
                                                      >
                                                          {artist.name}
                                                      </Link>
                                                      {item.album.artists.length == 1
                                                          ? undefined
                                                          : item.album.artists[i + 1]
                                                          ? ','
                                                          : undefined}
                                                      {/* {artists.map((artist, i) => (
                                                          <TrackArtist key={artist.name}>
                                                              <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                                                              {artists.length == 1
                                                                  ? undefined
                                                                  : artists[i + 1]
                                                                  ? ','
                                                                  : undefined}
                                                          </TrackArtist>
                                                      ))} */}
                                                  </p>
                                              );
                                          })}
                                      </div>
                                  </TrackTitle>
                                  <AlbumTitle>
                                      <Link to={`/album/${item.album.id}`}>{item.album.name}</Link>
                                  </AlbumTitle>
                              </TrackList>
                          );
                      })}
            </table>
        </div>
    );
};
