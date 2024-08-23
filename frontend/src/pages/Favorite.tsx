import { useDispatch, useSelector } from 'react-redux';
import FavoriteList from '../components/FavoriteList';
import FavoriteModal from '../components/FavoriteModal';
import {
  setSearchQuery,
  sortMoviesById,
  sortMoviesByTitle,
  sortMoviesByYear,
} from '../store/favoriteSlice';
import { RootState } from '../store/store';

const Favorite = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.movies.searchQuery
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    switch (value) {
      case 'id':
        dispatch(sortMoviesById());
        break;
      case 'title':
        dispatch(sortMoviesByTitle());
        break;
      case 'year':
        dispatch(sortMoviesByYear());
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1 className="headline-l text-center text-yellow-350 mt-10 mb-5">
        Favorite Movies
      </h1>
      <div className="lg:px-28 px-6">
        <div className="flex justify-between bg-white/10 rounded-md h-full p-2">
          <div className="flex items-center gap-3">
            <input
              onChange={handleSearchChange}
              value={searchQuery}
              type="text"
              placeholder="Search movies..."
              className="p-2 w-96 bg-black text-yellow-350 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-350"
            />
            Sort by:
            <select
              name="sorting"
              id="movies"
              onChange={handleSortChange}
              className="p-2 bg-black text-yellow-350 rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-yellow-350"
            >
              <option value="title">Title</option>
              <option value="id">ID</option>
              <option value="year">Year</option>
            </select>
          </div>

          <FavoriteModal title={'Add New'} />
        </div>
      </div>
      <div className="lg:px-28 px-6">
        <FavoriteList />
      </div>
    </>
  );
};

export default Favorite;
