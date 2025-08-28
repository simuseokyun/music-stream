import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSidebar = () => {
    const [activeMenu, setActiveMenu] = useState<'home' | 'library' | null>(null);
    const location = useLocation();
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
    return { goHome, goLibrary, goBack, activeMenu };
};

export default useSidebar;
