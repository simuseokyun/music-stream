import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const SearchInput = () => {
    const { register, setValue, handleSubmit } = useForm<{ title: string }>();
    const navigate = useNavigate();
    const goSearchResult = ({ title }: { title: string }) => {
        setValue('title', '');
        navigate(`/search?q=${encodeURIComponent(title)}`);
    };

    return (
        <div className="w-full flex flex-col items-center bg-[rgba(0,0,0,0.5)] pb-6 pt-2 z-10">
            <form className="text-center w-full max-w-[400px]" onSubmit={handleSubmit(goSearchResult)}>
                <input
                    className="w-full p-2 rounded-3xl text-white bg-[rgb(40,40,40)] text-sm"
                    type="text"
                    placeholder="아티스트나 노래제목을 입력해주세요"
                    {...register('title', {
                        minLength: { value: 1, message: '한 글자 이상 입력하세요' },
                        required: { value: true, message: '필수 값 입니다' },
                    })}
                />
            </form>
        </div>
    );
};
