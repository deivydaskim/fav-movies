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
    <li className="flex p-3 border-[1px] border-white/10 rounded-md">
      <div className="flex sm:flex-row flex-col flex-1 gap-4">
        <div className="md:self-auto self-center min-w-60 flex-shrink-0">
          <img
            className="rounded-xl min-h-60 w-64"
            src={details.imageUrl}
            alt={details.title}
          />
        </div>
        <div className="flex flex-col justify-between py-1 gap-4">
          <div className="space-y-4">
            <h1 className="headline-m">{details.title}</h1>
            <p className="body-2">{details.description}</p>
          </div>
          <p className="body-2 text-gray-300">
            {formatDate(details.releaseDate)}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <button
          onClick={handleDelete}
          className="border-[1px] border-white/0 transition-all hover:border-yellow-350 hover:text-yellow-350  rounded-md text-2xl w-8 self-end"
        >
          &times;
        </button>
        <FavoriteModal title="EDIT" mode="edit" data={details} />
      </div>
    </li>
  );
};

export default FavoriteItem;
