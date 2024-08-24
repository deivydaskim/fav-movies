import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/icons/logo.svg';
import searchIcon from '../assets/icons/search-icon.svg';
import SearchResults from './SearchResults';
import { getSearchResults } from '../services/MoviesAPI';
import { debounce } from '../utils/utils';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const [searchData, setSearchData] = useState<Search | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const inputValue = inputRef.current!.value;
    setLoading(true);
    setError(null);

    if (inputValue.length === 0) {
      setSearchData(null);
      setLoading(false);
      return;
    }
    try {
      const search = await getSearchResults(inputValue);
      setSearchData(search as Search);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleDebouncedSearch = debounce(handleSearch, 500);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const resetSearch = () => {
    inputRef.current!.value = '';
    setSearchData(null);
  };

  const baseStyle = 'px-4 py-2 rounded-md transition duration-300 ease-in-out';
  const activeStyle = 'bg-white/20 text-white';
  const inactiveStyle =
    'bg-white/10 text-gray-300 hover:bg-white/30 hover:text-white';

  const homeStyle =
    location.pathname === '/'
      ? `${baseStyle} ${activeStyle}`
      : `${baseStyle} ${inactiveStyle}`;
  const favoriteStyle =
    location.pathname === '/favorite'
      ? `${baseStyle} ${activeStyle}`
      : `${baseStyle} ${inactiveStyle}`;

  return (
    <>
      <header className="flex flex-col items-center gap-3 px-6 sm:flex-row sm:gap-10 lg:px-28">
        <div>
          <Link onClick={() => sessionStorage.clear()} to={`/`}>
            <img src={logo} alt="Find movies logo" />
          </Link>
        </div>
        <div className="relative w-full flex-1">
          <input
            className="w-full rounded-sm bg-slate-100 p-4 py-2 pl-10 text-black focus:outline-yellow-400"
            placeholder="Search a Movie"
            type="text"
            ref={inputRef}
            onInput={handleDebouncedSearch}
            onBlur={resetSearch}
          />
          <button className="absolute left-2 top-1/2 h-7 w-7 -translate-y-1/2">
            <img className="opacity-70" src={searchIcon} alt="Search icon" />
          </button>
          <SearchResults
            resetSearch={resetSearch}
            data={searchData}
            loading={loading}
            error={error}
          />
        </div>
      </header>
      <nav className="mt-4 flex items-center justify-between px-6 lg:px-28">
        <ul className="flex gap-1">
          <li>
            <Link to="/" className={homeStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/favorite" className={favoriteStyle}>
              Favorite list
            </Link>
          </li>
        </ul>
        {!isAuthenticated() ? (
          <Link to="/auth?mode=login" className="">
            <button
              className={`${baseStyle} ${inactiveStyle} place-self-center`}
            >
              Login
            </button>
          </Link>
        ) : (
          <button
            className={`${baseStyle} ${inactiveStyle}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </nav>
    </>
  );
};

export default Header;
