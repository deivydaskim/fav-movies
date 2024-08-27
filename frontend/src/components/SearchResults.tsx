import { Link } from 'react-router-dom';
import { getTitle, getYear, isMovie } from '../utils/utils';

interface MediaListProps {
  loading: boolean;
  error: Error | null;
  data: Search | null;
  resetSearch: () => void;
}

const SearchResults: React.FC<MediaListProps> = ({
  loading,
  error,
  data,
  resetSearch,
}) => {
  const filteredResults = data
    ? data.results
        .filter(
          (result) =>
            result.media_type === 'movie' || result.media_type === 'tv',
        )
        .slice(0, 10)
    : [];

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className="absolute top-11 z-10 w-full rounded-sm bg-[#212121]">
      {loading && <p className="p-2 text-gray-400">Loading...</p>}
      {error && <p className="p-2 text-gray-400">Something went wrong...</p>}
      {data && !loading && (
        <ul className="max-h-80 overflow-y-scroll">
          {filteredResults.length === 0 ? (
            <p className="p-2 text-gray-400">Can't find media</p>
          ) : (
            filteredResults.map((result) => (
              <Link
                key={result.id}
                onClick={resetSearch}
                onMouseDown={handleMouseDown}
                to={
                  isMovie(result)
                    ? `/movie/${result.id}`
                    : `/series/${result.id}`
                }
              >
                <li className="flex gap-4 p-2 body-2">
                  {result.poster_path ? (
                    <img
                      className="w-14 rounded-sm"
                      src={`https://image.tmdb.org/t/p/w92/${result.poster_path}`}
                      alt={getTitle(result)}
                    />
                  ) : (
                    <div className="h-[84px] w-14 rounded-sm bg-slate-500 pt-3 text-center text-xs text-gray-900">
                      No img
                    </div>
                  )}

                  <div className="flex flex-col justify-around">
                    <h3>{getTitle(result)}</h3>
                    <p>{getYear(result)}</p>
                  </div>
                </li>
              </Link>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
