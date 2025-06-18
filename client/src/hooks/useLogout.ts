import { useQueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from '../services/api/client';
import useUserStore from '../store/user';

const useLogout = () => {
    const { setUser } = useUserStore();
    const queryClient = useQueryClient();
    const onLogout = async () => {
        const response = await fetchWithAuth(`/api/logout`, {
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
