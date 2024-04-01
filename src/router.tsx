import path from 'path';
import { element } from 'prop-types';
import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import { Home } from './components/home';
import { About } from './components/about';
import { AlbumForm } from './components/albumForm';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Home />,
                children: [
                    {
                        path: 'album/:albumId',
                        element: <AlbumForm />,
                    },
                ],
            },
            {
                path: 'about',
                element: <About />,
            },
        ],
    },
]);
