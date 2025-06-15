// export default function AlbumList() {
//     return (
//         <ul className="grid grid-cols-3 md:grid-cols-4">
//             {data?.pages.map((page) =>
//                 page?.items.map(({ id, name, images, release_date, album_type }) => (
//                     <AlbumItem
//                         key={id}
//                         id={id}
//                         release={release_date.slice(0, 4)}
//                         type={album_type === 'album' ? typeTransform.album : typeTransform.single}
//                         cover={images[0].url}
//                         name={name}
//                     />
//                 ))
//             )}
//         </ul>
//     );
// }
