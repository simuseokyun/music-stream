import { useNavigate } from 'react-router-dom';

export default function MobileFooter() {
    const navigate = useNavigate();
    const navList = [
        { url: '/home', image: '/assets/homeButton.svg' },
        { url: '/seek', image: '/assets/search.svg' },
        { url: '/library?active=playlist', image: '/assets/libraryButton.svg' },
    ];
    return (
        <div className="w-full fixed bottom-0 left-0 h-[50px] bg-main z-10 md:hidden ">
            <div className="max-w-[600px] w-[80%] h-full mx-auto">
                <div className="w-full h-full flex items-center justify-center ">
                    {navList?.map((list) => {
                        return (
                            <li className="flex-1 p-1 text-center" key={list?.url}>
                                <img src={list.image} alt="네비게이션 아이콘" onClick={() => navigate(list?.url)} />
                            </li>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
