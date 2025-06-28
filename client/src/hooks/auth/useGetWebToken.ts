import { useQuery } from '@tanstack/react-query';
import { WebToken } from '../../types/api/auth';
import { getWebToken } from '../../services/auth/\bauth';

const useGetWebToken = () => {
    const { data, isLoading, isError, error } = useQuery<WebToken>({
        queryKey: ['webToken'],
        queryFn: getWebToken,
        retry: 2,
        staleTime: 50 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });
    return { data, isLoading, isError, error };
};
export default useGetWebToken;
