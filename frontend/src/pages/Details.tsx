import { useLoaderData } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import starIcon from '../assets/icons/star-icon.svg';
import { formatDate, formatMinutes, getTitle, getYear } from '../utils/utils';
import FavoriteModal from '../components/FavoriteModal';
import { useAuth } from '../hooks/useAuth';

type MediaDetails = MovieDetails | SeriesDetails;

const Details = () => {
  const mediaDetails = useLoaderData() as MediaDetails;
  const { isAuthenticated } = useAuth();

  const isMovie = 'title' in mediaDetails;
  const title = getTitle(mediaDetails);
  const year = getYear(mediaDetails);
  const runtimeOrSeasons = isMovie
    ? formatMinutes(mediaDetails.runtime)
    : `${mediaDetails.seasons.length} seasons`;
  const imageUrl = `https://image.tmdb.org/t/p/w300/${mediaDetails.poster_path}`;

  const renderGenres = () =>
    mediaDetails.genres.map(({ id, name }) => (
      <li
        key={id}
        className="rounded-full border border-gray-500 bg-gray-100/10 px-2 py-0.5 lg:px-4 lg:py-1"
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
        (member) => member.job === 'Director',
      );
      return directors[0]?.name;
    }
    if (mediaDetails.created_by.length > 0) {
      return mediaDetails.created_by.map((crew) => crew.name).join(', ');
    }
  };

  const dataToSave: FavMovie = {
    id: mediaDetails.id,
    title: title as string,
    description: mediaDetails.overview,
    releaseDate: isMovie
      ? mediaDetails.release_date
      : mediaDetails.last_air_date,
    imageUrl: imageUrl,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className="mt-9 flex flex-col justify-between px-6 py-4 gradient-gray md:flex-row md:py-10 lg:px-28">
          <div className="space-y-2">
            <h3 className="font-bold uppercase text-yellow-350 body">
              {isMovie ? 'Movie' : 'Series'}
            </h3>
            <h1 className="font-semibold headline-xl">{title}</h1>
            <p className="caption-2">
              {year}
              <span className="inline-block w-4"></span>
              {runtimeOrSeasons}
            </p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3 self-end md:self-auto">
            {isAuthenticated() && (
              <FavoriteModal
                buttonTitle={'Favorite'}
                mode="add"
                data={dataToSave}
              />
            )}
            <div className="flex items-center">
              <img src={starIcon} className="w-10" alt="star icon" />
              <p className="headline-l">
                {mediaDetails.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="!lowercase text-gray-300 caption">
              {mediaDetails.vote_count}
              <br />
              ratings
            </p>
          </div>
        </section>
        <section className="my-12 flex flex-col gap-8 px-6 md:flex-row lg:px-28">
          <div className="min-w-60 self-center md:self-auto">
            {mediaDetails.poster_path ? (
              <img src={imageUrl} alt={title} className="w-64 rounded-xl" />
            ) : (
              <div className="h-96 w-64 select-none rounded-xl text-center leading-[24rem] opacity-70 gradient-gray headline-m">
                NO IMAGE
              </div>
            )}
          </div>
          <div className="space-y-6">
            <ul className="flex flex-wrap gap-3 text-gray-300 body-2">
              {renderGenres()}
            </ul>
            <p className="text-justify body">{mediaDetails.overview}</p>
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
                  isMovie
                    ? mediaDetails.release_date
                    : mediaDetails.last_air_date,
                )}
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export default Details;
