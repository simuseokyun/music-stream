import path from 'path';
import { element } from 'prop-types';
import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import { Home } from './components/home';
import { About } from './components/about';
import { AlbumForm } from './components/albumForm';
import { ArtistForm } from './components/artistForm';
import { SearchResult } from './components/searchResult';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Home />,
                // children: [
                //     {
                //         path: 'artist/:artistId',
                //         element: <ArtistForm />,
                //     },
                // ],
            },
            {
                path: 'search',
                element: <SearchResult />,
            },
            {
                path: 'album/:albumId',
                element: <AlbumForm />,
            },
        ],
    },
]);
