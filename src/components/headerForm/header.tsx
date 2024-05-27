import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { openSearch, searchState } from '../../atoms';
import { useNavigate } from 'react-router-dom';

interface ITrack {
    track: string;
}
const Container = styled.div<{ open: boolean }>`
    position: fixed;
    left: 0;
    top: ${(props) => (props.open ? 0 : '-100px')};
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 20px 0;
    z-index: 2;
    transition: all 0.5s;
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
    background-color: white;
    @media (max-width: 725px) {
        width: 200px;
        padding: 5px;
    }

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
        <Container open={openSearch_}>
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
