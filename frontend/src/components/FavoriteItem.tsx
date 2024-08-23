import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMovie } from '../store/favoriteSlice';
import { formatDate } from '../utils/utils';
import { AppDispatch } from '../store/store';
import FavoriteModal from './FavoriteModal';

interface FavoriteItemProps {
  details: FavMovie;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ details }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteMovie(details.id));
  };

  return (
    <li className="flex p-2 border-[1px] border-white/10 rounded-md">
      <div className="flex flex-1 gap-4">
        <img
          className="h-80 w-56 object-cover rounded-sm"
          src={details.imageUrl}
          alt={details.title}
        />
        <div className="flex flex-col justify-between py-1">
          <div className="space-y-2">
            <h1 className="headline-m">{details.title}</h1>
            <p className="body-2">{details.description}</p>
          </div>
          <p className="body-2">{formatDate(details.releaseDate)}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <button
          onClick={handleDelete}
          className="border-[1px] border-yellow-350 rounded-md text-2xl w-8 self-end"
        >
          &times;
        </button>
        <FavoriteModal title="EDIT" mode="edit" data={details} />
      </div>
    </li>
  );
};

export default FavoriteItem;
