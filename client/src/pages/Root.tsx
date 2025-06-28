import { useEffect } from 'react';
import '../services/api/interceptor';
import { Outlet } from 'react-router-dom';
import { SearchInput } from '../components/searchResult/SearchInput';
import SideBar from '../components/layout/SideBar';
import MobileFooter from '../components/layout/MobileFooter';
import MobileHeader from '../components/layout/MobileHeader';
import Player from '../components/player/Player';
import useCheckUser from '../hooks/auth/useCheckUser';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../components/modal/ModalContainer';
import { useViewportStore } from '../store/common';
import useGetWebToken from '../hooks/auth/useGetWebToken';
import useGetSdkToken from '../hooks/auth/useGetSdkToken';
import useUserStore from '../store/user';
import { useLocation } from 'react-router-dom';
export const Root = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const authCode = queryParams.get('code') || '';
    const { data, isLoading, isError, error } = useGetWebToken();
    const { isSuccess } = useGetSdkToken(authCode);
    useCheckUser();
    const setIsMobile = useViewportStore((state) => state.setIsMobile);
    const { hydrated, resetHydrated } = useUserStore();
    useEffect(() => {
        const userAgent = navigator.userAgent;
        const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
        setIsMobile(mobile);
    }, []);
    useEffect(() => {
        if (isSuccess) {
            resetHydrated();
        }
    }, [isSuccess]);
    if (!hydrated) {
        return null;
    }
    if (isLoading) {
        return null;
    }
    if (isError || !data?.access_token)
        return (
            <div className="flex-1">
                <h1 className="text-center mt">{error?.message}</h1>
            </div>
        );
    return (
        <div className="w-full bg-[inherit]">
            <ModalContainer />
            <div className="p-[20px] pt-[40px] pb-[120px] md:pb-30 md:p-[20px] max-w-[1200px] mx-auto">
                <div className="hidden md:block">
                    <SearchInput />
                </div>
                <div className="block p-0 mt-[60px] md:flex md:gap-5 md:items-start md:m-0">
                    <SideBar />
                    <MobileHeader />
                    <Outlet />
                </div>
                <MobileFooter />
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                limit={1}
                hideProgressBar={true}
                theme="dark"
                newestOnTop
                closeOnClick
                pauseOnHover
            />
            <Player />
        </div>
    );
};
