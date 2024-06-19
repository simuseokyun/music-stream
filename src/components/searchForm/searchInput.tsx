import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { searchFormState } from '../../state/atoms';
import { useNavigate } from 'react-router-dom';

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
const Input = styled.input`
    display: inline-block;
    width: 300px;
    padding: 10px;
    outline: none;
    border-radius: 20px;
    color: white;
    background-color: rgb(40, 40, 40) !important;
    border: 1px solid transparent;
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

export const SearchInput = () => {
    const navigate = useNavigate();
    const searchState = useRecoilValue(searchFormState);
    const { register, setValue, handleSubmit } = useForm<{ title: string }>();
    const onValid = ({ title }: { title: string }) => {
        setValue('title', '');
        navigate(`search/${title}`);
    };

    return (
        <Container open={searchState}>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input
                    type="text"
                    placeholder="제목을 입력하세요"
                    {...register('title', {
                        minLength: { value: 1, message: '한 글자 이상 입력하세요' },
                        required: { value: true, message: '필수 값 입니다' },
                    })}
                />
            </Form>
        </Container>
    );
};
