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
    <div className="lg:px-28 px-6">
      <div className="flex mt-14 mb-5 justify-between items-end">
        <h1 className="justify-self-start headline-l text-yellow-350">
          Favorite Movies
        </h1>
        <FavoriteModal title={'Add New'} />
      </div>
      <div className="bg-white/10 rounded-md py-1 px-2">
        <div className="flex sm:flex-row flex-col gap-2 justify-between">
          <input
            onChange={handleSearchChange}
            value={searchQuery}
            type="text"
            placeholder="Search movies..."
            className="h-10 sm:max-w-screen-sm pl-2 body-2 sm:flex-1 flex-0 bg-black text-yellow-350 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-350"
          />
          <div className="flex justify-end items-center flex-1 max-w-60 body-2">
            <p className="">Sort by:</p>
            <select
              name="sorting"
              id="movies"
              defaultValue=""
              onChange={handleSortChange}
              className="flex-1 h-10 pl-2 ml-2 bg-black text-yellow-350 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-350"
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
