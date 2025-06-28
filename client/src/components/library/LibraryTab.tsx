import useLibraryTab from '../../hooks/library/useLibraryTab';

export default function LibraryTab() {
    const { active, openModal, onClickGridTab, onClickTab, sortState, activeState } = useLibraryTab();
    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
                <button
                    className={`text-sm p-1 px-2 rounded-md ${active === 'playlist' ? 'bg-active' : ''}`}
                    onClick={() => onClickTab('playlist')}
                >
                    플레이리스트
                </button>
                <button
                    className={`text-sm p-1 px-2 rounded-md ${active === 'album' ? 'bg-active' : ''}`}
                    onClick={() => onClickTab('album')}
                >
                    내가 찜한 앨범
                </button>
            </div>
            <div className="flex items-center">
                {activeState === 'playlist' && (
                    <img className="p-1" src="/assets/addButton.svg" onClick={() => openModal('addPlaylist')} />
                )}
                {sortState === 'flex' ? (
                    <img className="p-1" src="/assets/gridButton.svg" onClick={() => onClickGridTab('grid')} />
                ) : (
                    <img className="p-1" src="/assets/listButton.svg" onClick={() => onClickGridTab('flex')} />
                )}
            </div>
        </div>
    );
}
