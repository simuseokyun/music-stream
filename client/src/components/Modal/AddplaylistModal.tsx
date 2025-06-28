import { useForm } from 'react-hook-form';
import useUserStore from '../../store/user';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import useCreatePlaylist from '../../hooks/playlist/useCreatePlaylist';
import Modal from '../common/Modal';
import { PlaylistListResponse } from '../../types/api/playlist';
import { AddPlaylistForm } from '../../types/models/playlist';
export default function AddPlaylistModal({ onClose }: { onClose: () => void }) {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddPlaylistForm>();
    const { mutate: addPlaylist } = useCreatePlaylist();
    const user = useUserStore((state) => state.user?.id);
    const checkName = (name: string) => {
        const list = queryClient.getQueryData<InfiniteData<PlaylistListResponse>>(['playlists']);
        const isDuplicate = list?.pages.flatMap((page) => page.items).some((item) => item.name === name);
        return isDuplicate ? '이미 존재하는 이름입니다.' : true;
    };

    const onSubmit = (formData: AddPlaylistForm) => {
        addPlaylist({ ...formData, user: user! });
        onClose();
    };
    return (
        <Modal onClose={onClose} modalTitle="플레이리스트 생성">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name" className="text-sm">
                    이름
                </label>
                <input
                    className="w-full text-sm mt-2 p-1 bg-[rgb(40,40,40)] rounded-xl"
                    id="name"
                    type="text"
                    placeholder="이름을 작성해주세요"
                    {...register('name', {
                        required: '이름은 필수입니다.',
                        maxLength: {
                            value: 15,
                            message: '가능한 입력 숫자를 초과하였습니다.',
                        },
                        validate: checkName,
                    })}
                />
                <label htmlFor="description" className="text-sm mt-4 block">
                    설명
                </label>
                <input
                    className="w-full text-sm mt-2 p-1 bg-[rgb(40,40,40)] rounded-xl"
                    id="description"
                    type="text"
                    placeholder="설명을 작성해주세요"
                    {...register('description')}
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
                <div className="mt-20">
                    <div className="text-right absolute bottom-[20px] right-[20px]">
                        <button type="submit">생성</button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
