import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSdkToken } from '../../services/auth/auth';

const useGetSdkToken = (code: string) => {
    const navigate = useNavigate();
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['token', 'sdk'],
        queryFn: () => getSdkToken(code),
        enabled: !!code,
        retry: 2,
    });

    useEffect(() => {
        if (data && isSuccess) {
            window.history.replaceState({}, document.title, window.location.pathname);
            navigate('/home', { replace: true });
        }
    }, [isSuccess]);

    return { data, isLoading, isError, isSuccess };
};
export default useGetSdkToken;
