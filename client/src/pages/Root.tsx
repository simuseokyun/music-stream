import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getWebToken } from '../api/getWebToken';
import { getSdkToken } from '../api/getSdkToken';
import { setLocalStorage } from '../utils/setLocalStorage';
import { extractAuthCodeFromUrl } from '../utils/extractAuthCodeFromUrl';
import { SearchInput } from '../components/searchForm/searchInput';
import { SideBar } from '../components/common/SideBar';
import { MobileFooter } from '../components/common/MobileFooter';
import { MobileHeader } from '../components/common/MobileHeader';
import { Player } from '../components/playerForm/player';
import { ISpotifyWebToken } from '../types/auth';
import useIsMobile from '../store/useIsMobile';
import { AddPlaylistModal } from '../components/myPlaylistForm/AddplaylistModal';
import useAddPlaylistModal from '../store/useAddPlaylistModal';
import useUserInfo from '../store/useUserInfo';
import useCategoryState from '../store/useCategoryState';
import { PlaylistCategory } from '../components/common/PlaylistCategory';
import CheckUser from '../components/auth/CheckUser';

export const Root = () => {
    const setIsMobile = useIsMobile((state) => state.setIsMobile);

    const AddPlaylistState = useAddPlaylistModal((state) => state.open);
    const categoryState = useCategoryState((state) => state.open);
    const navigate = useNavigate();
    const home = window.location.href;
    const authCode = extractAuthCodeFromUrl(home) || '';
    const { data: webToken, status } = useQuery<ISpotifyWebToken>({
        queryKey: ['getWebToken'],
        queryFn: getWebToken,
        retry: 2,
        staleTime: 50 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });

    const { isLoading, isError, error } = useQuery({
        queryKey: ['getSdkToken'],
        queryFn: () => getSdkToken(authCode),
        enabled: !!authCode,
        retry: 2,
    });

    useEffect(() => {
        if (authCode) {
            window.history.replaceState({}, document.title, window.location.pathname);
            navigate('/home');
        }
    }, [authCode]);
    useEffect(() => {
        const userAgent = navigator.userAgent;
        const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
        setIsMobile(mobile);
    }, []);

    useEffect(() => {
        if (webToken) {
            const { access_token, expires_in } = webToken;
            setLocalStorage('webAccessToken', access_token);
            setLocalStorage('webExpiration', expires_in);
        }
    }, []);

    if (isLoading) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <img className="img-medium m-20 animate-spin" src="/assets/loading.png" />
            </div>
        );
    }
    return (
        <div className="w-full bg-[inherit]">
            <CheckUser />
            {AddPlaylistState && <AddPlaylistModal />}
            {categoryState && <PlaylistCategory />}
            <div className="p-[20px] pt-[40px] pb-[120px] md:pb-30 md:p-[20px] max-w-[1200px] mx-auto">
                <div className="hidden md:block">
                    <SearchInput />
                </div>
                <div className="block p-0 mt-[60px] md:flex md:gap-5 md:items-start md:m-0">
                    <SideBar />
                    <MobileHeader />
                    {webToken && <Outlet />}
                </div>
                <MobileFooter />
            </div>
            <Player />
        </div>
    );
};
