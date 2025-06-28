import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const SearchInput = () => {
    const navigate = useNavigate();
    const { register, setValue, handleSubmit } = useForm<{ title: string }>();
    const goSearchResult = ({ title }: { title: string }) => {
        setValue('title', '');
        navigate(`/search?q=${title}`);
    };

    return (
        <div className="w-full max-w-[400px] mx-auto bg-[rgba(0,0,0,0.5)] pb-6 pt-2  z-[10]">
            <form className="text-center" onSubmit={handleSubmit(goSearchResult)}>
                <input
                    className="w-full p-2 rounded-[20px] text-white bg-[rgb(40,40,40)] border border-transparent text-sm"
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
