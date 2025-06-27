import { useNavigate } from 'react-router-dom';

export default function MobileFooter() {
    const navList = [
        { url: '/home', image: '/assets/homeButton.svg' },
        { url: '/seek', image: '/assets/search.svg' },
        { url: '/library?active=playlist', image: '/assets/libraryButton.svg' },
    ];
    const navigate = useNavigate();
    return (
        <div className="fixed bottom-0 left-0 w-full h-[50px] md:hidden bg-main z-10">
            <div className="max-w-[600px] w-[80%] h-full mx-auto">
                <div className="flex items-center justify-center h-full w-full">
                    {navList?.map((list) => {
                        return (
                            <li className="flex-1 p-1 text-center" key={list.url}>
                                <img src={list.image} alt="이미지" onClick={() => navigate(list.url)} />
                            </li>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
