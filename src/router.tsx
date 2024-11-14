// import Root from './root';
// import { createBrowserRouter } from 'react-router-dom';
// import { Home } from './pages/Home';
// import { Album } from './pages/album/Album';
// import { Artist } from './pages/artist/Artist';
// import { Main } from './pages/Main';
// import { Search } from './pages/search/Search';
// import { Library } from './pages/library/Library';

// import { MyPlaylist } from './pages/myPlaylist/MyPlaylist';
// import { AllAlbums } from './pages/allAlbums/AllAlbums';
// import { PopularPlaylist } from './pages/popularPlaylist/PopularPlaylist';
// import { NotFound } from './pages/NotFound';
// import { SearchSub } from './pages/search/SearchSub';

// export const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Root />,
//         children: [
//             {
//                 path: 'home',
//                 element: <Home />,
//                 children: [
//                     {
//                         path: '',
//                         element: <Main />,
//                     },
//                     {
//                         path: 'search/:title',
//                         element: <Search />,
//                     },
//                     {
//                         path: 'artist/:artistId',
//                         element: <Artist />,
//                     },
//                     {
//                         path: 'myPlaylist/:playlistId',
//                         element: <MyPlaylist />,
//                     },
//                     {
//                         path: 'album/:albumId',
//                         element: <Album />,
//                     },
//                     {
//                         path: 'popularPlaylist/:playlistId',
//                         element: <PopularPlaylist />,
//                     },
//                     {
//                         path: 'allAlbum/:artistId',
//                         element: <AllAlbums />,
//                     },
//                     {
//                         path: 'library',
//                         element: <Library />,
//                     },
//                 ],
//             },
//             {
//                 path: 'search',
//                 element: <SearchSub />,
//             },
//         ],
//         errorElement: <NotFound />,
//     },
// ]);
import Root from './root';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Album } from './pages/album/Album';
import { Artist } from './pages/artist/Artist';
import { Main } from './pages/Main';
import { Search } from './pages/search/Search';
import { Library } from './pages/library/Library';

import { MyPlaylist } from './pages/myPlaylist/MyPlaylist';
import { AllAlbums } from './pages/allAlbums/AllAlbums';
import { PopularPlaylist } from './pages/popularPlaylist/PopularPlaylist';
import { NotFound } from './pages/NotFound';
import { SearchSub } from './pages/search/SearchSub';

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
                        path: 'search/:title',
                        element: <Search />,
                    },
                    {
                        path: 'artist/:artistId',
                        element: <Artist />,
                    },
                    {
                        path: 'myPlaylist/:playlistId',
                        element: <MyPlaylist />,
                    },
                    {
                        path: 'album/:albumId',
                        element: <Album />,
                    },
                    {
                        path: 'popularPlaylist/:playlistId',
                        element: <PopularPlaylist />,
                    },
                    {
                        path: 'allAlbum/:artistId',
                        element: <AllAlbums />,
                    },
                    {
                        path: 'library',
                        element: <Library />,
                    },
                    {
                        path: 'search',
                        element: <SearchSub />,
                    },
                ],
            },
        ],

        errorElement: <NotFound />,
    },
]);
