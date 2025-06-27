import { useNavigate } from 'react-router-dom';
import onLogin from '../../utils/api/login';
import useLogout from '../../hooks/auth/useLogout';
import useUserStore from '../../store/user';

export default function MobileHeader() {
    const user = useUserStore((state) => state.user);
    const { onLogout } = useLogout();
    const navigate = useNavigate();
    const goback = () => navigate(-1);

    return (
        <header className="w-full fixed top-0 left-0 px-4 py-4 flex bg-main items-center justify-between z-20 md:hidden">
            <img className="img-small" src="/assets/backButton.svg" alt="뒤로가기" onClick={goback} />
            {!user ? (
                <img className="img-small" src="/assets/login.svg" alt="로그인" onClick={onLogin} />
            ) : (
                <img className="img-small" src="/assets/logout.svg" alt="로그아읏" onClick={onLogout} />
            )}
        </header>
    );
}
