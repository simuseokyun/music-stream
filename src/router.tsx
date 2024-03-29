import path from 'path';
import { element } from 'prop-types';
import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import { Home } from './components/home';
import { About } from './components/about';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
        ],
    },
]);
