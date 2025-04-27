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
        <div className="flex items-end mb-5 max-[425px]:block">
            <img className="img-large" src={cover}></img>
            <div className="ml-4">
                <h1 className="text-[24px] mb-[5px] max-[425px]:text-[20px">{name}</h1>
                <p className="mb-2">{length + '곡'}</p>
                <div className="relative">
                    <MoreBtn toggle={onToggle} />
                    {setting && <MyPlaylistCategory name={name} top={top} />}
                </div>
            </div>
            {checkForm && <DeleteCheckAlert name={name} />}
        </div>
    );
};
