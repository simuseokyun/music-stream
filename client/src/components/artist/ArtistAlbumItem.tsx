import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IArtistAlbum } from '../../types/artistInfo';

const Container = styled.li`
    width: 100%;
    border-radius: 8px;

    padding: 10px;
    &:hover {
        background-color: #1a191a;
    }
    @media (max-width: 768px) {
        padding: 5px;
    }
`;
const Title = styled.h1`
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const ReleaseWrap = styled.div`
    margin-top: 5px;
`;
const Release = styled.span`
    color: rgb(160, 160, 160);
`;
const Type = styled(Release)`
    margin-left: 3px;
`;
const Cover = styled.img`
    width: 100%;
    border-radius: 8px;
`;

export const AlbumItem = ({ id, name, cover, type, year }: IArtistAlbum) => {
    const navigate = useNavigate();
    const onClickAlbum = () => navigate(`/album/${id}`);
    return (
        <li className="md:hover:bg-[#1a191a] p-[10px] rounded-md cursor-pointer" onClick={onClickAlbum}>
            <img className="rounded-md" src={cover} alt="앨범 커버" />
            <h1 className="text-ellipsis mt-2 font-semibold text-sm sm:text-base">{name}</h1>
            <div className="mt-1">
                <span className="text-sub text-sm">{year}</span>
                <span className="text-sub text-sm ml-1">{type}</span>
            </div>
        </li>
    );
};
