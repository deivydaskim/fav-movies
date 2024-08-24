import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie } from '../store/favoriteSlice';
import { AppDispatch, RootState } from '../store/store';
import { formatDate } from '../utils/utils';
import FavoriteModal from './FavoriteModal';

interface FavoriteItemProps {
  details: FavMovie;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ details }) => {
  const dispatch = useDispatch<AppDispatch>();
  const deleteStatus = useSelector(
    (state: RootState) => state.movies.crudStatus,
  );

  const handleDelete = () => {
    dispatch(deleteMovie(details.id));
  };

  const isDeleting = deleteStatus === 'pending'

  return (
    <li className={`flex rounded-md border-[1px] border-white/10 p-3`}>
      <div className="flex flex-1 flex-col gap-4 sm:flex-row">
        <div className="min-w-60 flex-shrink-0 self-center md:self-auto">
          <img
            className="min-h-60 w-64 rounded-xl"
            src={details.imageUrl}
            alt={details.title}
          />
        </div>
        <div className="flex flex-col justify-between gap-4 py-1">
          <div className="space-y-4">
            <h1 className="headline-m">{details.title}</h1>
            <p className="body-2">{details.description}</p>
          </div>
          <p className="text-gray-300 body-2">
            {formatDate(details.releaseDate)}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <button
          onClick={handleDelete}
          className="w-8 self-end rounded-md border-[1px] border-white/0 text-2xl transition-all hover:border-yellow-350 hover:text-yellow-350"
          disabled={isDeleting}
        >
          &times;
        </button>
        <FavoriteModal buttonTitle="EDIT" mode="edit" data={details} />
      </div>
    </li>
  );
};

export default FavoriteItem;
