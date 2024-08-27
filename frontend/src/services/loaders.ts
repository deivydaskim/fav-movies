import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import { fetchDataForDetails } from './MoviesAPI';

export const movieLoader = async (
  args: LoaderFunctionArgs,
): Promise<MovieDetails> => {
  return fetchDataForDetails<MovieDetails>('/movie', args);
};

export const seriesLoader = async (
  args: LoaderFunctionArgs,
): Promise<SeriesDetails> => {
  return fetchDataForDetails<SeriesDetails>('/tv', args);
};

// This loader checks if the user is authenticated and redirects them if they are
export const authCheckLoader = async () => {
  const token = getAuthToken();

  if (token) {
    return redirect('/');
  }

  return null;
};
