import styled from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { playlistFixFormState, playlistList } from '../../store/atoms';
import { Button } from '../common/buttonForm/Button';
import { checkFormState } from '../../store/atoms';
import { DeleteCheckAlert } from '../common/DeleteCheckAlert';
import { MoreBtn } from '../common/buttonForm/MoreButton';
import { MyPlaylistCategory } from '../common/MyPlaylistCategory';
import { useState } from 'react';
const Container = styled.div`
    display: flex;
    align-items: end;
    margin-bottom: 20px;
    @media (max-width: 425px) {
        display: block;
    }
`;

const Cover = styled.img`
    background-color: #232323;
    width: 150px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
    @media (max-width: 425px) {
        margin: auto;
    }
`;

const Info = styled.div`
    margin-left: 20px;
    @media (max-width: 425px) {
        margin: 20px 0 0 0;
    }
`;

const Title = styled.p`
    font-size: 24px;
    margin-bottom: 5px;
    @media (max-width: 425px) {
        font-size: 20px;
    }
`;

const Length = styled.p`
    /* margin-bottom: 10px; */
`;

const Btn = styled.button`
    display: inline-block;
    text-align: center;
    background-color: #65d46e;
    border: none;
    border-radius: 4px;
    padding: 2px 6px;
`;

export const MyPlaylistInfo = ({
    cover,
    name,
    top,
    length,
}: {
    cover: string;
    name: string;
    top?: number;
    length: number;
}) => {
    const [checkForm, setCheckForm] = useRecoilState(checkFormState);
    const [setting, onSetting] = useState(false);
    const onToggle = () => {
        onSetting((prev) => {
            return !prev;
        });
    };
    return (
        <Container>
            <Cover src={cover}></Cover>
            <Info>
                <Title>{name}</Title>
                <Length>{length + '곡'}</Length>
                <div style={{ position: 'relative' }}>
                    <MoreBtn toggle={onToggle} />
                    {setting && <MyPlaylistCategory name={name} top={top} />}
                </div>
            </Info>
            {checkForm && <DeleteCheckAlert name={name} />}
        </Container>
    );
};
