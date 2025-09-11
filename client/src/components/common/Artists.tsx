import { Link } from 'react-router-dom';

export default function Artists({ artists }: { artists: { name: string; id: string }[] }) {
    return (
        <div className="truncate">
            {artists?.map((artist, i) => {
                return (
                    <Link
                        className="text-sm text-sub pointer-events-none md:pointer-events-auto"
                        to={`/artist/${artist?.id}`}
                        key={artist?.id}
                    >
                        <span>
                            {artist?.name}
                            {artists?.length == 1 ? undefined : artists[i + 1] ? ' , ' : undefined}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
