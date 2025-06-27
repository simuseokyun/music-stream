import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useLogout from '../../hooks/auth/useLogout';
import onLogin from '../../utils/api/login';
import NavItem from './NavItem';
import useUserStore from '../../store/user';
export default function SideBar() {
    const { onLogout } = useLogout();
    const [activeMenu, setActiveMenu] = useState<'home' | 'library' | null>(null);
    const location = useLocation();
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/home');
    };
    const goLibrary = () => {
        navigate('/library?active=playlist');
    };
    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (location.pathname === '/home') {
            setActiveMenu('home');
        } else if (location.pathname === '/library') {
            setActiveMenu('library');
        } else {
            setActiveMenu(null);
        }
    }, [location]);

    return (
        <nav className="hidden sticky top-10 flex-shrink-0 md:block md:w-auto lg:w-[250px]">
            <ul>
                <NavItem icon="/assets/backButton.svg" label="뒤로가기" onClick={goBack} />
                <NavItem icon="/assets/homeButton.svg" label="홈" onClick={goHome} active={activeMenu === 'home'} />
                <NavItem
                    icon="/assets/libraryButton.svg"
                    label="보관함"
                    onClick={goLibrary}
                    active={activeMenu === 'library'}
                />
                {!user ? (
                    <NavItem icon="/assets/login.svg" label="로그인" onClick={onLogin} />
                ) : (
                    <NavItem icon="/assets/logout.svg" label="로그아웃" onClick={onLogout} />
                )}
            </ul>
        </nav>
    );
}
