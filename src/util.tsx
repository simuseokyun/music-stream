export const saveTokenLocalStorage = (name: string, token: string) => {
    localStorage.setItem(name, token);
};
export const refreshTokenLocalStorage = (name: string, token: string) => {
    localStorage.setItem(name, token);
};

export const saveTokenExpires = (expi: string) => {
    localStorage.setItem('expirationTime', expi);
};
export const getTokenLocalStorage = (name: string) => {
    return localStorage.getItem(name);
};

export const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (!expirationTime) {
        return true; // 만료 시간이 없으면 토큰이 만료된 것으로 처리
    }
    return Date.now() > parseInt(expirationTime, 10);
};
