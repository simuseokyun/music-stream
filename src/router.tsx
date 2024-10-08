import Root from './root';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/homePage';
import { AlbumPage } from './pages/albumPage';
import { ArtistPage } from './pages/artistPage';
import { SearchResultPage } from './pages/searchResultPage';
import { MyPlaylistPage } from './pages/myPlaylistPage';
import { MainPage } from './pages/mainPage';
import { AllAlbumPage } from './pages/allAlbumPage';
import { PopularPlaylistPage } from './pages/popularPlaylistPage';
import { LibraryPage } from './pages/libraryPage';
import { InitPage } from './pages/initPage';
import { NotFound } from './pages/notFound';
import { SearchPage } from './pages/mobileSearchPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <InitPage />,
            },
            {
                path: 'home',
                element: <HomePage />,
                children: [
                    {
                        path: '',
                        element: <MainPage />,
                    },
                    {
                        path: 'search/:title',
                        element: <SearchResultPage />,
                    },
                    {
                        path: 'artist/:artistId',
                        element: <ArtistPage />,
                    },
                    {
                        path: 'playlist/:playlistId',
                        element: <MyPlaylistPage />,
                    },
                    {
                        path: 'album/:albumId',
                        element: <AlbumPage />,
                    },
                    {
                        path: 'popularPlaylist/:playlistId',
                        element: <PopularPlaylistPage />,
                    },
                    {
                        path: 'allAlbum/:artistId',
                        element: <AllAlbumPage />,
                    },
                    {
                        path: 'library',
                        element: <LibraryPage />,
                    },
                ],
            },
            {
                path: 'search',
                element: <SearchPage />,
            },
        ],
        errorElement: <NotFound />,
    },
]);
