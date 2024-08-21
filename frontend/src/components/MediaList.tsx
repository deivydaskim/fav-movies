import { useEffect, useState, useRef } from 'react';
import { getMedia } from '../services/MoviesAPI';
import Spinner from './Spinner';
import errorLogo from '../assets/icons/plug-error-illustration.svg';
import MediaListItem from './MediaListItem';

interface MediaListProps {
  resource: 'movie/now_playing' | 'movie/upcoming' | 'tv/airing_today';
}

const getResourceType = (
  resource: MediaListProps['resource']
): 'movie' | 'series' => {
  return resource.startsWith('movie') ? 'movie' : 'series';
};

const MediaList: React.FC<MediaListProps> = ({ resource }) => {
  const [mediaData, setMediaData] = useState<MediaResult<Movie | TV> | null>(
    JSON.parse(sessionStorage.getItem(resource) || 'null')
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(mediaData?.page || 1);
  const containerRef = useRef<HTMLUListElement>(null);

  const resourceType = getResourceType(resource);

  useEffect(() => {
    const handleMediaData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMedia(page, resource);

        setMediaData((prevData) => {
          if (!prevData) {
            sessionStorage.setItem(resource, JSON.stringify(data));
            return data;
          }

          const uniqueResults = data.results.filter(
            (item) =>
              !prevData.results.some((prevItem) => prevItem.id === item.id)
          );

          const newData = {
            ...data,
            results: [...prevData.results, ...uniqueResults],
          };

          sessionStorage.setItem(resource, JSON.stringify(newData));
          return newData;
        });
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    handleMediaData();
  }, [page, resource]);

  useEffect(() => {
    const container = containerRef.current;

    const savedScrollPosition = sessionStorage.getItem(
      `${resource}-scrollPosition`
    );
    if (savedScrollPosition && container) {
      container.scrollLeft = parseInt(savedScrollPosition, 10);
    }
  }, [resource]);

  const handleScroll = () => {
    const container = containerRef.current;

    if (!container) return;

    sessionStorage.setItem(
      `${resource}-scrollPosition`,
      container.scrollLeft.toString()
    );

    if (
      container.scrollLeft + container.clientWidth + 5 >=
        container.scrollWidth &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && !mediaData) {
    return <Skeleton />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <ul
      ref={containerRef}
      className="my-9 flex overflow-x-scroll overflow-y-hidden gap-5"
      onScroll={handleScroll}
    >
      {mediaData?.results.map((result) => (
        <MediaListItem
          key={result.id}
          result={result}
          resourceType={resourceType}
        />
      ))}
      {loading && (
        <li className="relative self-center">
          <Spinner />
        </li>
      )}
    </ul>
  );
};

const Skeleton = () => {
  return (
    <ul className="my-11 flex gap-5 overflow-hidden">
      {Array.from({ length: 10 }).map((_, index) => (
        <li className="first:ml-1" key={index}>
          <div className="w-[185px] h-[278px] mb-3 rounded-lg bg-gray-700 animate-pulse"></div>
          <div className="w-[185px] h-6 mb-9 rounded-lg bg-gray-700 animate-pulse"></div>
        </li>
      ))}
    </ul>
  );
};

const Error = () => {
  return (
    <div className="h-96 pl-4 pt-10 flex flex-col max-w-56 m-auto items-center gap-3 body">
      <h2 className="text-gray-200 text-center">Something went wrong...</h2>
      <img className="text-center" src={errorLogo} alt="" />
      <button
        className="px-3 py-1 rounded-md bg-blue-950 w-max"
        onClick={() => window.location.reload()}
      >
        Try reload page
      </button>
    </div>
  );
};

export default MediaList;
