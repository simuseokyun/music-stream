import useLibraryTab from '../../hooks/library/useLibraryTab';

export default function LibraryTab() {
    const { active, openModal, onClickLeftTab, onClickSortTab, sortState, activeState } = useLibraryTab();
    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
                <button
                    className={`text-sm p-2 rounded-md ${active === 'playlist' && 'bg-active'}`}
                    onClick={() => onClickLeftTab('playlist')}
                >
                    플레이리스트
                </button>
                <button
                    className={`text-sm p-2 rounded-md ${active === 'album' && 'bg-active'}`}
                    onClick={() => onClickLeftTab('album')}
                >
                    내가 찜한 앨범
                </button>
                <button
                    className={`text-sm p-2 rounded-md ${active === 'artist' ? 'bg-active' : ''}`}
                    onClick={() => onClickLeftTab('artist')}
                >
                    아티스트
                </button>
            </div>
            <div className="flex items-center">
                {activeState === 'playlist' && (
                    <img className="p-2" src="/assets/addButton.svg" onClick={() => openModal('addPlaylist')} />
                )}
                {sortState === 'flex' ? (
                    <img className="p-2" src="/assets/gridButton.svg" onClick={() => onClickSortTab('grid')} />
                ) : (
                    <img className="p-2" src="/assets/listButton.svg" onClick={() => onClickSortTab('flex')} />
                )}
            </div>
        </div>
    );
}
