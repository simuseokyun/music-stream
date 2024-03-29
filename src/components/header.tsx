import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

interface ITrack {
    track: string;
}

export const Header = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<ITrack>();
    const onValid = ({ track }: ITrack) => {
        setValue('track', '');
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    type="text"
                    placeholder="Search for Music"
                    {...register('track', {
                        minLength: { value: 1, message: '한 글자 이상 입력하세요' },
                        required: true,
                    })}
                />
                <button type="submit">Search</button>
                <p>{errors.track?.message || null}</p>
            </form>
        </div>
    );
};
