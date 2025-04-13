import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles/global.style';
function Root() {
    return (
        <>
            <GlobalStyle />
            <Outlet />
        </>
    );
}
export default Root;
