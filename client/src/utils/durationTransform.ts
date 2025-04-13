export const durationTransform = (duration: number) => {
    const totalSeconds = duration / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return { minutes, seconds };
};
