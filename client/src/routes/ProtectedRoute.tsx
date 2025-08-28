import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../store/user';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, hydrated } = useUserStore();
    if (!hydrated) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <img className="img-medium m-20 animate-spin" src="/assets/loading.png" alt="로딩 아이콘" />
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
}
