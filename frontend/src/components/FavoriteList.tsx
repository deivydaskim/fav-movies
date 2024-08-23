import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchMovies } from '../store/favoriteSlice';
import FavoriteItem from './FavoriteItem';
import Spinner from './Spinner';

const FavoriteList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.items);
  const error = useSelector((state: RootState) => state.movies.error);
  const movieStatus = useSelector((state: RootState) => state.movies.status);

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, movieStatus]);

  if (error) {
    return <p className="text-center my-10">{error}</p>;
  }

  if (movieStatus == 'loading') {
    return (
      <div className="z-20 inset-0 grid place-items-center mt-20">
          <Spinner />
        </div>
    );
  }

  return (
    <ul className="my-2 space-y-2">
      {movies.map((movie) => (
        <FavoriteItem key={movie.id} details={movie} />
      ))}
    </ul>
  );
};

export default FavoriteList;
