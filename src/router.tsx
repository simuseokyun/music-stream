import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import { Home } from './Routes/home';
import { AlbumForm } from './components/albumForm/albumForm';
import { ArtistForm } from './components/artistForm/artistForm';
import { SearchResult } from './components/SearchForm/searchResult';
import { PlaylistForm } from './components/playlistForm/playlistForm';
import { Main } from './Routes/main';
import { AllAlbum } from './components/artistForm/allAlbum';
import { PopularPlaylistForm } from './components/popularPlaylistForm/popularPlaylistForm';
import { Library } from './components/libraryForm/library';
import { InitForm } from './Routes/init';

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
