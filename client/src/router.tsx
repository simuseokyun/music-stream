import Root from './root';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Album } from './pages/album/Album';
import { Artist } from './pages/artist/Artist';
import { SearchResult } from './pages/search/SearchResult';
import { Library } from './pages/library/Library';
import { Playlist } from './pages/myPlaylist/MyPlaylist';
import { AllAlbum } from './pages/allAlbum/AllAlbum';
import { NotFound } from './pages/NotFound';
import { Search } from './pages/search/Search';
import { NewAlbum } from './components/home/newAlbumList';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
                children: [
                    { path: 'home', element: <NewAlbum /> },
                    {
                        path: 'search',
                        element: <Search />,
                    },
                    {
                        path: 'search/:title',
                        element: <SearchResult />,
                    },
                    {
                        path: 'artist/:artistId',
                        element: <Artist />,
                    },
                    {
                        path: 'album/:albumId',
                        element: <Album />,
                    },
                    {
                        path: 'me/playlist/:playlistId',
                        element: <Playlist />,
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
        errorElement: <NotFound />,
    },
]);
