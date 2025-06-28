import { axiosInstance } from './client';

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        if (error.response?.status === 401) {
            try {
                await axiosInstance.post('/api/auth/refresh');
                return axiosInstance(config);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
