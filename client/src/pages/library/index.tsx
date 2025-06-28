import MyAlbumList from '../../components/library/MyAlbumList';
import MyPlaylistList from '../../components/library/MyPlaylistList';
import LibraryTab from '../../components/library/LibraryTab';
import { useLibraryTabStore } from '../../store/library';

export default function Library() {
    const active = useLibraryTabStore((state) => state.active);
    return (
        <div className="flex-1 relative rounded-lg overflow-hidden md:bg-black">
            <h1 className="mb-2 text-2xl font-bold">나의 라이브러리</h1>
            <LibraryTab />
            {active === 'playlist' ? <MyPlaylistList /> : <MyAlbumList />}
        </div>
    );
}
