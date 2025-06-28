import { create } from 'zustand';
import { UseUser } from '../types/store/store';

const useUserStore = create<UseUser>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    hydrated: false,
    setHydrated: (value) => set({ hydrated: value }),
    resetHydrated: () => set({ hydrated: false }),
}));

export default useUserStore;
