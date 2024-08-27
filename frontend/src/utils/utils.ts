type MediaData = MovieDetails | SeriesDetails | SearchResult;

export const isMovie = (media: MediaData): media is MovieDetails => {
  return media !== undefined && 'title' in media;
};

export const getTitle = (media: MediaData) => {
  return isMovie(media) ? media.title : media.name;
};

export const getYear = (media: MediaData) => {
  const year = isMovie(media) ? media.release_date : media.first_air_date;
  if (!year || year === '') {
    return 'Unknown date';
  }
  return new Date(year).getFullYear();
};

export const formatMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
