const extractAuthCodeFromUrl = (url: string) => {
    const params = new URLSearchParams(url.split('?')[1]);
    return params.get('code');
};
export default extractAuthCodeFromUrl;
