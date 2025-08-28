import MyAlbumList from '../../components/library/MyAlbumList';
import MyPlaylistList from '../../components/library/MyPlaylistList';
import MyArtistList from '../../components/library/MyArtistList';
import LibraryTab from '../../components/library/LibraryTab';
import { useLibraryTabStore } from '../../store/library';

export default function Library() {
    const active = useLibraryTabStore((state) => state.active);
    return (
        <div className="flex-1 ">
            <h1 className="text-2xl font-bold mb-2">나의 라이브러리</h1>
            <LibraryTab />
            {active === 'playlist' && <MyPlaylistList />}
            {active === 'album' && <MyAlbumList />}
            {active === 'artist' && <MyArtistList />}
        </div>
    );
}
