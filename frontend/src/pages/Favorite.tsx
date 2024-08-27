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
    (state: RootState) => state.movies.searchQuery,
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
    <div className="px-6 lg:px-28">
      <div className="mb-5 mt-14 flex items-end justify-between">
        <h1 className="justify-self-start text-yellow-350 headline-l">
          Favorite Movies
        </h1>
        <FavoriteModal buttonTitle={'Add New'} />
      </div>
      <div className="rounded-md bg-white/10 px-2 py-1">
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <input
            onChange={handleSearchChange}
            value={searchQuery}
            type="text"
            placeholder="Search movies..."
            className="flex-0 h-10 rounded-md bg-black pl-2 text-yellow-350 body-2 focus:outline-none focus:ring-2 focus:ring-yellow-350 sm:max-w-screen-sm sm:flex-1"
          />
          <div className="flex max-w-60 flex-1 items-center justify-end body-2">
            <p className="">Sort by:</p>
            <select
              name="sorting"
              id="movies"
              defaultValue=""
              onChange={handleSortChange}
              className="ml-2 h-10 flex-1 rounded-md bg-black pl-2 text-yellow-350 focus:outline-none focus:ring-2 focus:ring-yellow-350"
            >
              <option value="" disabled>
                Select
              </option>
              <option value="title">Title A-Z</option>
              <option value="id">Oldest added</option>
              <option value="year">Release Year</option>
            </select>
          </div>
        </div>
      </div>

      <FavoriteList />
    </div>
  );
};

export default Favorite;
