import NavItem from './NavItem';
import useLogout from '../../hooks/auth/useLogout';
import useSidebar from '../../hooks/common/useSideBar';
import onLogin from '../../utils/auth/spotify';
import useUserStore from '../../store/user';
export default function SideBar() {
    const { onLogout } = useLogout();
    const { goHome, goBack, goLibrary, activeMenu } = useSidebar();
    const session = useUserStore((state) => state.user);

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
                {!session ? (
                    <NavItem icon="/assets/login.svg" label="로그인" onClick={onLogin} />
                ) : (
                    <NavItem icon="/assets/logout.svg" label="로그아웃" onClick={onLogout} />
                )}
            </ul>
        </nav>
    );
}
