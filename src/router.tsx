import path from 'path';
import { element } from 'prop-types';
import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import { Home } from './components/home';
import { About } from './components/about';
import { AlbumForm } from './components/albumForm';
import { ArtistForm } from './components/artistForm';
import { SearchResult } from './components/searchResult';
import { PlaylistForm } from './components/playlistForm';
import { LoginForm } from './components/login';
import { NewAlbum } from './components/newAlbum';
import { Main } from './components/main';
import { AllAlbum } from './components/artistForm/allAlbum';
import { PopularPlaylistForm } from './components/popularPlaylist/popularPlaylistForm';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <LoginForm />,
            },
            {
                path: 'home',
                element: <Home />,
                children: [
                    {
                        path: '',
                        element: <Main />,
                    },
                    {
                        path: 'search',
                        element: <SearchResult />,
                    },
                    {
                        path: 'artist/:artistId',
                        element: <ArtistForm />,
                        children: [
                            {
                                path: 'allAlbum',
                                element: <AllAlbum />,
                            },
                        ],
                    },
                    {
                        path: 'playlist/:playlistId',
                        element: <PlaylistForm />,
                    },
                    {
                        path: 'album/:albumId',
                        element: <AlbumForm />,
                    },
                    {
                        path: 'popularPlaylist/:id',
                        element: <PopularPlaylistForm />,
                    },
                ],
            },
        ],
    },
]);
