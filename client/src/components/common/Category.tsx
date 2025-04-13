import styled from 'styled-components';
import { Category, CategoryItem, Cover, SubTitle, AlertTitle } from '../../styles/common.style';
import { useRecoilValue } from 'recoil';
import { playlistSelector } from '../../store/atoms';
import { useState } from 'react';

const SearchInput = styled.input`
    width: 100%;
    padding: 5px;
    outline: none;
    margin-bottom: 10px;
`;

export const PlaylistList = ({ addTrack }: { addTrack: (event: React.MouseEvent<HTMLLIElement>) => void }) => {
    const playlists = useRecoilValue(playlistSelector);

    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리

    // 검색어를 기준으로 플레이리스트 필터링
    const filteredPlaylists = playlists?.filter((playlist) => {
        const regex = new RegExp(`^${searchTerm}`, 'i'); // 'i'는 대소문자 무시

        // 검색어와 제목이 정규식으로 일치하는지 확인
        return regex.test(playlist.title);
    });
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(searchTerm);

        setSearchTerm(event.target.value);
    };
    return (
        <Category>
            <AlertTitle style={{ fontSize: '14px' }}>플레이리스트에 추가</AlertTitle>
            <SearchInput type="text" placeholder="플레이리스트 찾기" onChange={handleSearchChange}></SearchInput>
            {!searchTerm
                ? playlists?.map((playlist) => {
                      return (
                          <CategoryItem key={playlist.id} id={playlist.title} onClick={addTrack}>
                              <SubTitle>{playlist.title}</SubTitle>
                          </CategoryItem>
                      );
                  })
                : filteredPlaylists?.map((playlist) => {
                      return (
                          <CategoryItem key={playlist.id} id={playlist.title} onClick={addTrack}>
                              <SubTitle>{playlist.title}</SubTitle>
                          </CategoryItem>
                      );
                  })}
        </Category>
    );
};
