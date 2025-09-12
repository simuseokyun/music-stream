const commaSeparate = (num: number = 0): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export default commaSeparate;
