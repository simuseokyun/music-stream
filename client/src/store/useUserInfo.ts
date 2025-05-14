import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    display_name: string;
}

interface UserInfo {
    user: User | null;
    setUser: (user: User | null) => void;
    clearUser: () => void;
}

const useUserInfo = create<UserInfo>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

export default useUserInfo;
