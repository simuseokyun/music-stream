import useUserStore from '../../store/user';
import { useEffect } from 'react';
import axios from 'axios';
const useCheckUser = () => {
    const { setUser, hydrated, setHydrated } = useUserStore();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/me');
                setUser(response.data);
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
