import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { searchFormState } from '../../state/atoms';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding-bottom: 20px;
    z-index: 100;
    transition: all 0.5s;
`;

const Form = styled.form`
    text-align: center;
`;
const Input = styled.input`
    display: inline-block;
    width: 100%;
    padding: 10px;
    outline: none;
    border-radius: 20px;
    color: white;
    background-color: rgb(40, 40, 40) !important;
    border: 1px solid transparent;
    @media (max-width: 725px) {
    }
    &:hover {
        background-color: rgb(40, 40, 40);
    }
    &:focus {
        border: 1px solid white;
    }
`;

export const SearchInput = () => {
    const navigate = useNavigate();
    const searchState = useRecoilValue(searchFormState);
    const { register, setValue, handleSubmit } = useForm<{ title: string }>();
    const onValid = ({ title }: { title: string }) => {
        setValue('title', '');
        navigate(`/home/search/${title}`);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input
                    type="text"
                    placeholder="어떤 것을 듣고 싶으세요?"
                    {...register('title', {
                        minLength: { value: 1, message: '한 글자 이상 입력하세요' },
                        required: { value: true, message: '필수 값 입니다' },
                    })}
                />
            </Form>
        </Container>
    );
};
