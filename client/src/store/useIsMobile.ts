import { create } from 'zustand';

interface IUseMobile {
    isMobile: boolean;
    setIsMobile: (state: boolean) => void;
}
const useIsMobile = create<IUseMobile>((set) => ({
    isMobile: false,
    setIsMobile: (state) => {
        set(() => ({
            isMobile: state,
        }));
    },
}));

export default useIsMobile;
