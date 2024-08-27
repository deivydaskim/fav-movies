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
      className="my-2 block transition-transform duration-200 ease-linear first:ml-1 hover:scale-105"
      to={`${resourceType}/${result.id}`}
    >
      <li>
        <div className="relative mb-3 h-[278px] w-[185px]">
          {result.poster_path ? (
            <img
              className="h-full rounded-lg object-cover"
              src={`https://image.tmdb.org/t/p/w185/${result.poster_path}`}
              alt={getTitle(result)}
            />
          ) : (
            <div className="h-full w-full rounded-lg bg-slate-900 pt-10">
              <p className="text-center text-slate-400">No image</p>
            </div>
          )}
          <div className="absolute -bottom-[1px] -left-[1px] flex h-10 w-20 items-center justify-evenly rounded-se-lg bg-black">
            <img className="w-6" src={star} alt="Rating star" />
            <p>{result.vote_average.toFixed(1)}</p>
          </div>
        </div>
        <h3 className="max-w-[185px] text-wrap text-center body-2">
          {getTitle(result)}
        </h3>
      </li>
    </Link>
  );
};

export default MediaListItem;
