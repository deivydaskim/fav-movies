import { LoaderFunctionArgs } from 'react-router-dom';

import { fetchData } from './MoviesAPI';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchDataForDetails = async <T>(
  endpoint: string,
  params: LoaderFunctionArgs
): Promise<T> => {
  const { id } = params.params;
  const url = `${BASE_URL}${endpoint}/${id}?append_to_response=credits`;

  return await fetchData<T>(url);
};

export const movieLoader = async (
  args: LoaderFunctionArgs
): Promise<MovieDetails> => {
  return fetchDataForDetails<MovieDetails>('/movie', args);
};

export const seriesLoader = async (
  args: LoaderFunctionArgs
): Promise<SeriesDetails> => {
  return fetchDataForDetails<SeriesDetails>('/tv', args);
};
