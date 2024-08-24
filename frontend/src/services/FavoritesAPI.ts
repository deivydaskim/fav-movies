/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { getAuthToken } from '../utils/auth';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/movie';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export const fetchMoviesApi = () =>
  axios.get<FavMovie[]>(API_URL, getAuthHeaders());
export const addMovieApi = (movie: FavMovie) => {
  const { id, ...destructedMovie } = movie;
  return axios.post<FavMovie>(API_URL, destructedMovie, getAuthHeaders());
};
export const updateMovieApi = (movieId: number, movie: FavMovie) => {
  const { id, ...destructedMovie } = movie;
  return axios.patch<FavMovie>(
    `${API_URL}/${movieId}`,
    destructedMovie,
    getAuthHeaders(),
  );
};
export const deleteMovieApi = (id: number) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeaders());
