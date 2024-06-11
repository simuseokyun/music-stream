import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import { Home } from './pages/homePage';
import { AlbumForm } from './pages/albumPage';
import { ArtistForm } from './pages/artistPage';
import { SearchResult } from './pages/searchPage';
import { PlaylistForm } from './pages/myPlaylistPage';
import { Main } from './pages/mainPage';
import { AllAlbum } from './pages/allAlbumPage';
import { PopularPlaylistForm } from './pages/popularPlaylistPage';
import { Library } from './pages/libraryPage';
import { InitForm } from './pages/initPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <InitForm />,
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
                    {
                        path: 'allAlbum/:artistId',
                        element: <AllAlbum />,
                    },
                    {
                        path: 'library',
                        element: <Library />,
                    },
                ],
            },
        ],
    },
]);
