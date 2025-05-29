import { useForm } from 'react-hook-form';
import useUserStore from '../../store/useUserInfo';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import fetchWithRefresh from '../../utils/fetchWithRefresh';
import Modal from './Modal';
interface FormData {
    name: string;
    description: string;
    user: string;
}

interface IMyPlaylists {
    items: {
        id: string;
        name: string;
        description: string;
        images: { url: string }[];
        owner: { display_name: string };
    }[];
}
export const AddPlaylistModal = ({ onClose }: { onClose: () => void }) => {
    const user = useUserStore((state) => state.user?.id);
    const queryClient = useQueryClient();
    const checkName = (name: string) => {
        const list = queryClient.getQueryData<InfiniteData<IMyPlaylists>>(['playlists']);
        const isDuplicate = list?.pages.flatMap((page) => page.items).some((item) => item.name === name);
        return isDuplicate ? '이미 존재하는 이름입니다.' : true;
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onCreatePlaylist = useMutation({
        mutationFn: async (data: { name: string; description: string; user: string }) => {
            return await fetchWithRefresh(`${import.meta.env.VITE_SERVER_URI}/api/me/playlist/add`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        },
        onSuccess: (data) => {
            const client = queryClient.getQueryData<InfiniteData<IMyPlaylists>>(['playlists']);
            if (!client) {
                return;
            }
            const newData = {
                ...client,
                pages: [{ ...client.pages[0], items: [data, ...client.pages[0].items] }, ...client.pages.slice(1)],
            };
            queryClient.setQueryData(['playlists'], newData);
        },
    });

    const onSubmit = (formData: FormData) => {
        onCreatePlaylist.mutate({ ...formData, user: user! });
        onClose();
    };
    return (
        <Modal onClose={onClose} modalTitle="플레이리스트 생성">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="md:flex md:items-start">
                    <div className="md:flex-1">
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
                                minLength: {
                                    value: 1,
                                    message: '이름은 최소 1자 이상이어야 합니다.',
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
                    </div>
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
                <div className="text-right absolute bottom-[20px] right-[20px]">
                    <button type="submit">생성</button>
                </div>
            </form>
        </Modal>
    );
};
