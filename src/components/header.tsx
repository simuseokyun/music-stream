import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { searchState } from '../atoms';

interface ITrack {
    track: string;
}
const Container = styled.div`
    padding: 20px;
`;
const Form = styled.form`
    text-align: center;
`;
const Input = styled.input`
    display: inline-block;
    width: 300px;
    outline: none;
    padding: 10px;
    border-radius: 20px;
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
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<ITrack>();
    const onValid = ({ track }: ITrack) => {
        setSearch(track);
        setValue('track', '');
    };
    console.log(search);
    return (
        <Container>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input
                    type="text"
                    placeholder="Search for Music"
                    {...register('track', {
                        minLength: { value: 1, message: '한 글자 이상 입력하세요' },
                        required: { value: true, message: '필수 값 입니다' },
                    })}
                />
                {/* <button type="submit">Search</button> */}
                <p>{errors.track?.message || null}</p>
            </Form>
        </Container>
    );
};
