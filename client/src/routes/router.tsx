import { createBrowserRouter } from 'react-router-dom';
import { Root } from '../pages/Root';
import Album from '../pages/album';
import Artist from '../pages/artist';
import SearchResult from '../pages/searchResult';
import Library from '../pages/library';
import Playlist from '../pages/playlist';
import AllAlbum from '../pages/allAlbum';
import Error from '../components/common/Error';
import Search from '../components/layout/SearchForm';
import NewAlbum from '../components/home/AlbumList';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/auth/login';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            { index: true, element: <NewAlbum /> },
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
