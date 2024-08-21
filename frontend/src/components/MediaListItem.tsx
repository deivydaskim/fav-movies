import { Link } from 'react-router-dom';
import star from '../assets/icons/star-icon.svg';
import { getTitle } from '../utils/utils';

interface MediaListItemProps {
  result: Movie | TV;
  resourceType: 'movie' | 'series';
}

const MediaListItem: React.FC<MediaListItemProps> = ({
  result,
  resourceType,
}) => {
  return (
    <Link
      className="first:ml-1 block hover:scale-105 transition-transform duration-200 ease-linear my-2"
      to={`${resourceType}/${result.id}`}
    >
      <li>
        <div className="relative mb-3 w-[185px] h-[278px]">
          {result.poster_path ? (
            <img
              className="rounded-lg h-full object-cover"
              src={`https://image.tmdb.org/t/p/w185/${result.poster_path}`}
              alt={getTitle(result)}
            />
          ) : (
            <div className="rounded-lg w-full h-full pt-10 bg-slate-900">
              <p className="text-center text-slate-400">No image</p>
            </div>
          )}
          <div className="h-10 w-20 absolute bg-black rounded-se-lg -left-[1px] -bottom-[1px] flex justify-evenly items-center">
            <img className="w-6" src={star} alt="Rating star" />
            <p>{result.vote_average.toFixed(1)}</p>
          </div>
        </div>
        <h3 className="body-2 text-center max-w-[185px] text-wrap">
          {getTitle(result)}
        </h3>
      </li>
    </Link>
  );
};

export default MediaListItem;
