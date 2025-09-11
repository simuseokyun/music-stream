import { useEffect } from 'react';
import '../services/api/interceptor';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { SearchInput } from '../components/searchResult/SearchInput';
import SideBar from '../components/layout/SideBar';
import MobileFooter from '../components/layout/MobileFooter';
import MobileHeader from '../components/layout/MobileHeader';
import Player from '../components/player/Player';
import useCheckUser from '../hooks/auth/useCheckUser';
import ModalContainer from '../components/Modal/ModalContainer';
import useAgentCheck from '../hooks/common/useAgentCheck';
import useGetWebToken from '../hooks/auth/useGetWebToken';
import useGetSdkToken from '../hooks/auth/useGetSdkToken';
import useUserStore from '../store/user';
import ToastContainer from '../components/layout/ToastContainer';
export default function Root() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const authCode = queryParams.get('code') || '';
    const { data, isLoading, isError, error } = useGetWebToken();
    const { isSuccess } = useGetSdkToken(authCode);
    useCheckUser();
    useAgentCheck();
    const { hydrated, resetHydrated } = useUserStore();
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
                <h1 className="text-center mt-20">{error?.message}</h1>
            </div>
        );
    return (
        <div className="w-full bg-transparent">
            <ToastContainer />
            <ModalContainer />
            <div className="px-3 pt-10 pb-[120px] max-w-[1200px] mx-auto sm:px-5 md:p-10 md:pb-[80px] ">
                <div className="hidden md:block">
                    <SearchInput />
                </div>
                <div className="block mt-[40px] md:flex md:gap-5 md:items-start md:m-0">
                    <SideBar />
                    <MobileHeader />
                    <Outlet />
                </div>
                <MobileFooter />
            </div>
            <Player />
        </div>
    );
}
