interface User {
    id: string;
    email: string;
    display_name: string;
}

export interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    clearUser: () => void;
    hydrated: boolean;
    setHydrated: (value: boolean) => void;
}
