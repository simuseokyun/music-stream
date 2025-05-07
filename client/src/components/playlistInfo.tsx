interface IPlaylistInfo {
    id: string;
    name: string;
    image: string;
    owner: string;
}

export const PlaylistInfo = ({ id, name, image, owner }: IPlaylistInfo) => {
    return (
        <div className=" text-center md:flex md:items-end md:text-start border-b-1 border-white/20 pb-[20px]">
            <img
                className="inline-block w-[200px] rounded-[8px] max-[768px]:w-[150px] max-[425px]:mx-auto"
                src={image}
            />
            <div className="md:ml-4">
                <p className="mb-2 mt-2 text-sm md:text-base md:mt-0">플레이리스트</p>
                <h1 className="text-[24px] mt-2 my-[4px] font-bold md:text-[30px] md:mt-0">{name}</h1>
                <div className="mb-2 md:mb-0">
                    <img className="mr-1 p-0.5 bg-[gray] rounded-full" src="/assets/user.svg" alt="user" />
                    <span className="text-sm">{owner}</span>
                </div>
            </div>
        </div>
    );
};
