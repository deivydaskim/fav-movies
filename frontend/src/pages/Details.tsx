import { useLoaderData } from 'react-router-dom';

import starIcon from '../assets/icons/star-icon.svg';
import { formatDate, formatMinutes, getTitle, getYear } from '../utils/utils';

type MediaDetails = MovieDetails | SeriesDetails;

const Details = () => {
  const mediaDetails = useLoaderData() as MediaDetails;

  const isMovie = 'title' in mediaDetails;
  const title = getTitle(mediaDetails);
  const year = getYear(mediaDetails);
  const runtimeOrSeasons = isMovie
    ? formatMinutes(mediaDetails.runtime)
    : `${mediaDetails.seasons.length} seasons`;

  const renderGenres = () =>
    mediaDetails.genres.map(({ id, name }) => (
      <li
        key={id}
        className="lg:py-1 lg:px-4 py-0.5 px-2 border border-gray-500 rounded-full bg-gray-100/10"
      >
        {name}
      </li>
    ));

  const renderCast = () => {
    const actors = mediaDetails.credits.cast.slice(0, 5);
    return actors.map((actor, index) => (
      <span key={actor.id}>
        {actor.name}
        {index !== actors.length - 1 && ', '}
      </span>
    ));
  };

  const renderDirector = () => {
    if (isMovie) {
      const directors = mediaDetails.credits.crew.filter(
        (member) => member.job === 'Director'
      );
      return directors[0].name;
    }
    if (mediaDetails.created_by.length > 0) {
      return mediaDetails.created_by.map((crew) => crew.name).join(', ');
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row lg:px-28 px-6 gradient-gray md:py-10 py-4 mt-9 justify-between">
        <div className="space-y-2">
          <h3 className="body font-bold uppercase text-yellow-350">
            {isMovie ? 'Movie' : 'Series'}
          </h3>
          <h1 className="headline-xl font-semibold">{title}</h1>
          <p className="caption-2">
            {year}
            <span className="inline-block w-4"></span>
            {runtimeOrSeasons}
          </p>
        </div>
        <div className="flex gap-3 items-center flex-shrink-0 md:self-auto self-end">
          <div className="flex items-center">
            <img src={starIcon} className="w-10" alt="star icon" />
            <p className="headline-l">{mediaDetails.vote_average.toFixed(1)}</p>
          </div>
          <p className="caption !lowercase text-gray-300">
            {mediaDetails.vote_count}
            <br />
            ratings
          </p>
        </div>
      </section>
      <section className="lg:px-28 px-6 my-12 flex md:flex-row flex-col gap-8">
        <div className="md:self-auto self-center min-w-60">
          {mediaDetails.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300/${mediaDetails.poster_path}`}
              alt={title}
              className="rounded-xl w-64"
            />
          ) : (
            <div className="rounded-xl w-64 gradient-gray h-96 leading-[24rem] headline-m text-center select-none opacity-70">
              NO IMAGE
            </div>
          )}
        </div>
        <div className="space-y-6">
          <ul className="flex gap-3 body-2 text-gray-300 flex-wrap">
            {renderGenres()}
          </ul>
          <p className="body text-justify">{mediaDetails.overview}</p>
          <div className="space-y-2 body-2">
            <p>
              <strong>Director: </strong>
              {renderDirector()}
            </p>
            <p>
              <strong>Stars: </strong>
              {renderCast()}
            </p>
            <p>
              <strong>Countries Of Origin: </strong>
              {mediaDetails.production_countries
                .map(({ name }) => name)
                .join(', ')}
            </p>
            <p>
              <strong>Release Date: </strong>
              {formatDate(
                isMovie ? mediaDetails.release_date : mediaDetails.last_air_date
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
