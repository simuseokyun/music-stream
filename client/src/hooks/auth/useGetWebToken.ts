import { useQuery } from '@tanstack/react-query';
import { getWebToken } from '../../services/auth/auth';
import { WebToken } from '../../types/api/auth';

const useGetWebToken = () => {
    const { data, isLoading, isError, error } = useQuery<WebToken>({
        queryKey: ['token', 'web'],
        queryFn: getWebToken,
        retry: 2,
        staleTime: 50 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });
    return { data, isLoading, isError, error };
};
export default useGetWebToken;
