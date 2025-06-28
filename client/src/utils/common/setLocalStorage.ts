const setLocalStorage = (name: string, value: string) => {
    localStorage.setItem(name, value);
};
const getLocalStorage = (name: string) => {
    return localStorage.getItem(name);
};

export { getLocalStorage, setLocalStorage };
