import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchMovies } from '../store/favoriteSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import FavoriteItem from './FavoriteItem';
import Spinner from './Spinner';
import Reconnect from './Reconnect';
import Pagination from './Pagination';
import { motion, AnimatePresence } from 'framer-motion';

const MOVIES_PER_PAGE = 5;

const FavoriteList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.items);
  const searchQuery = useSelector(
    (state: RootState) => state.movies.searchQuery,
  );
  const error = useSelector((state: RootState) => state.movies.error);
  const movieStatus = useSelector((state: RootState) => state.movies.status);

  const location = useLocation();
  const navigate = useNavigate();

  // Extract page from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const currentPage = +(queryParams.get('page') || '1');
  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, movieStatus]);

  // Sync URL with current page
  useEffect(() => {
    navigate({ search: `?page=${currentPage}` });
  }, [currentPage, navigate]);

  // Navigate to page 1 if searchQuery changes and is not empty
  useEffect(() => {
    if (searchQuery && currentPage !== 1) {
      navigate({ search: `?page=1` });
    }
  }, [searchQuery, currentPage, navigate]);

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

  // Filtering by search input
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Show text if no content is visible
  if (filteredMovies.length === 0) {
    return (
      <h2 className="mt-8 text-center text-gray-300 body">
        {movies.length === 0
          ? 'Favorite list is empty, add new movies'
          : "Can't find anything"}
      </h2>
    );
  }

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

  return (
    <>
      <AnimatePresence>
        <motion.ul
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="my-2 space-y-2"
        >
          {paginatedMovies.map((movie) => (
            <FavoriteItem key={movie.id} details={movie} />
          ))}
        </motion.ul>
      </AnimatePresence>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          navigate({ search: `?page=${page}` });
        }}
      />
    </>
  );
};

export default FavoriteList;
