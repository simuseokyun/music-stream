export const AlbumCover = ({ cover }: { cover: string }) => {
    return <img className="w-[200px] rounded-[8px] max-[768px]:w-[150px] max-[425px]:mx-auto" src={cover} />;
};
