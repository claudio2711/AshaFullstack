import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { Album, selectAlbum } from '@/features/library/librarySlice';

interface Props { album: Album }

const AlbumItem: FC<Props> = ({ album }) => {
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch();
  

  const handleClick = () => {
    dispatch(selectAlbum(album.id));        // salva in redux
    navigate(`/album/${album.id}`);         // routing
  };

  return (
    <article onClick={handleClick} className={`flex-shrink-0 w-[180px] cursor-pointer`}>
      <img src={album.cover} alt={album.title}
           className="w-full h-40 object-cover rounded-lg" />
      <h3 className="font-semibold mt-3 truncate">{album.title}</h3>
      <p  className="text-sm text-gray-400 truncate">{album.desc}</p>
    </article>
  );
};

export default memo(AlbumItem);
