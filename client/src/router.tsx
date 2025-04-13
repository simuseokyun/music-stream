import Root from './root';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Album } from './pages/album/Album';
import { Artist } from './pages/artist/Artist';

import { SearchResult } from './pages/search/SearchResult';
import { Library } from './pages/library/Library';

import { MyPlaylist } from './pages/myPlaylist/MyPlaylist';
import { AllAlbum } from './pages/allAlbum/AllAlbum';
import { PopularPlaylist } from './pages/popularPlaylist/PopularPlaylist';
import { NotFound } from './pages/NotFound';
import { Search } from './pages/search/Search';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
                children: [
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
                        path: 'myPlaylist/:playlistId',
                        element: <MyPlaylist />,
                    },
                    {
                        path: 'popularPlaylist/:playlistId',
                        element: <PopularPlaylist />,
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
