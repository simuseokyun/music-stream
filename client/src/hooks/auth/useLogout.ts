import { useQueryClient } from '@tanstack/react-query';
import { axiosWithAuth } from '../../services/api/client';
import useUserStore from '../../store/user';

const useLogout = () => {
    const { setUser } = useUserStore();
    const queryClient = useQueryClient();
    const onLogout = async () => {
        const response = await axiosWithAuth(`/api/logout`, {
            method: 'post',
        });
        if (response.status) {
            queryClient.clear();
            setUser(null);
        }
    };
    return { onLogout };
};

export default useLogout;
