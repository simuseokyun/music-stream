import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { openSearch, searchState } from '../atoms';
import { useNavigate } from 'react-router-dom';

interface ITrack {
    track: string;
}
const Container = styled.div`
    padding: 20px;
`;
const Form = styled.form`
    text-align: center;
`;
const Input = styled.input<{ open: boolean }>`
    display: inline-block;
    transform: translateY(${(props) => (props.open ? 0 : '-100px')});
    transition: all 0.5s;
    width: 300px;
    padding: 10px;
    outline: none;
    border-radius: 20px;
    color: white;
    border: 1px solid transparent;
    background-color: rgb(40, 40, 40);
    &:hover {
        background-color: rgb(40, 40, 40);
    }
    &:focus {
        border: 1px solid white;
    }
`;

export const Header = () => {
    const [search, setSearch] = useRecoilState(searchState);
    const navigate = useNavigate();
    const openSearch_ = useRecoilValue(openSearch);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<ITrack>();
    const onValid = ({ track }: ITrack) => {
        setSearch(track);
        setValue('track', '');
        navigate('search');
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input
                    open={openSearch_}
                    type="text"
                    placeholder="Search for Music"
                    {...register('track', {
                        minLength: { value: 1, message: '한 글자 이상 입력하세요' },
                        required: { value: true, message: '필수 값 입니다' },
                    })}
                />
            </Form>
        </Container>
    );
};
