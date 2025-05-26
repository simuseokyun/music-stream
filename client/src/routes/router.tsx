import { createBrowserRouter } from 'react-router-dom';
import { Root } from '../pages/Root';
import { Album } from '../pages/album/Album';
import { Artist } from '../pages/artist/Artist';
import { SearchResult } from '../pages/search/SearchResult';
import { Library } from '../pages/library/Library';
import { Playlist } from '../pages/myPlaylist/MyPlaylist';
import { AllAlbum } from '../pages/allAlbum/AllAlbum';
import { Error } from '../components/common/Error/Error';
import { Search } from '../pages/search/Search';
import { NewAlbum } from '../components/Home/newAlbumList';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Login from '../pages/login/Login';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            { path: 'home', element: <NewAlbum /> },
            { path: 'login', element: <Login /> },
            { path: 'seek', element: <Search /> },
            { path: 'search', element: <SearchResult /> },
            { path: 'artist/:artistId', element: <Artist /> },
            { path: 'album/:albumId', element: <Album /> },
            { path: 'allAlbum/:artistId', element: <AllAlbum /> },
            {
                path: 'me/playlist/:playlistId',
                element: (
                    <ProtectedRoute>
                        <Playlist />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'library',
                element: (
                    <ProtectedRoute>
                        <Library />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
