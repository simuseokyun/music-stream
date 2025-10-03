import { useEffect } from 'react';
import { getDataWithAuth } from '../../services/api/client';
import useUserStore from '../../store/user';

const useCheckUser = () => {
    const { setUser, hydrated, setHydrated } = useUserStore();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getDataWithAuth(`/api/me/check`);

                if (response?.loginState) {
                    const { id, email, display_name } = response;
                    setUser({ id, email, display_name });
                } else {
                    throw new Error('현재 로그아웃 상태입니다');
                }
            } catch (error) {
                setUser(null);
            } finally {
                setHydrated(true);
            }
        };
        if (!hydrated) {
            fetchUser();
        }
    }, [hydrated, setHydrated, setUser]);
};

export default useCheckUser;
