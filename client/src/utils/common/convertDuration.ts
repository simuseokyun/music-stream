const convertDuration = (ms = 0): string => {
    const totalSecond = Math.floor(ms / 1000);
    const minute = Math.floor(totalSecond / 60);
    const second = totalSecond % 60;
    return `${minute}:${second.toString().padStart(2, '0')}`;
};
export default convertDuration;
