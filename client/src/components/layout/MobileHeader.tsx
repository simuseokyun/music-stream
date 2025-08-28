import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/auth/useLogout';
import onLogin from '../../utils/auth/spotify';
import useUserStore from '../../store/user';

export default function MobileHeader() {
    const { onLogout } = useLogout();
    const navigate = useNavigate();
    const session = useUserStore((state) => state.user);
    const goback = () => navigate(-1);

    return (
        <header className="w-full fixed top-0 left-0 p-4 flex bg-main items-center justify-between z-10 md:hidden">
            <img className="img-small" src="/assets/backButton.svg" alt="이전 아이콘" onClick={goback} />
            {!session ? (
                <img className="img-small" src="/assets/login.svg" alt="로그인 아이콘" onClick={onLogin} />
            ) : (
                <img className="img-small" src="/assets/logout.svg" alt="로그아웃 아이콘" onClick={onLogout} />
            )}
        </header>
    );
}
