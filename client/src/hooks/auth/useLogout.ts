import { useQueryClient } from '@tanstack/react-query';
import { getDataWithAuth } from '../../services/api/client';
import useUserStore from '../../store/user';

const useLogout = () => {
    const setUser = useUserStore((state) => state.setUser);
    const queryClient = useQueryClient();
    const onLogout = async () => {
        const response = await getDataWithAuth(`/api/logout`, {
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
