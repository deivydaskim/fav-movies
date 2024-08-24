import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchMovies, clearCrudError } from '../store/favoriteSlice';
import FavoriteItem from './FavoriteItem';
import Spinner from './Spinner';
import Modal from './Modal';
import Reconnect from './Reconnect';

const FavoriteList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.items);
  const searchQuery = useSelector(
    (state: RootState) => state.movies.searchQuery,
  );
  const error = useSelector((state: RootState) => state.movies.error);
  const movieStatus = useSelector((state: RootState) => state.movies.status);
  const crudError = useSelector((state: RootState) => state.movies.crudError);

  const [showPopup, setShowPopup] = useState(false);

  //console.log(movies);

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, movieStatus]);

  // Show popup if there's a CRUD error
  useEffect(() => {
    if (crudError) {
      setShowPopup(true);
    }
  }, [crudError]);

  const handleClosePopup = () => {
    setShowPopup(false);
    dispatch(clearCrudError());
  };

  if (movieStatus === 'loading') {
    return (
      <div className="inset-0 z-20 mt-20 grid place-items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <p className="my-6 text-center headline-m">{error}</p>
        <Reconnect />
      </>
    );
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <ul className="my-2 space-y-2">
        {filteredMovies.map((movie) => (
          <FavoriteItem key={movie.id} details={movie} />
        ))}
      </ul>

      <Modal onClose={handleClosePopup} isOpen={showPopup}>
        {crudError}
      </Modal>
    </>
  );
};

export default FavoriteList;
