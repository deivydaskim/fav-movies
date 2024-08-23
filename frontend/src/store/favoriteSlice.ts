import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthToken } from '../utils/auth';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/movie';

export const fetchMovies = createAsyncThunk<FavMovie[]>(
  'movies/fetchMovies',
  async () => {
    const authToken = getAuthToken();
    const response = await axios.get<FavMovie[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  }
);

export const addMovie = createAsyncThunk<FavMovie, FavMovie>(
  'movies/addMovie',
  async (movie) => {
    const authToken = getAuthToken();
    const { id, ...destructedMovie } = movie;
    const response = await axios.post<FavMovie>(API_URL, destructedMovie, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  }
);

export const updateMovie = createAsyncThunk<
  FavMovie,
  { movieId: number; movie: FavMovie }
>('movies/updateMovie', async ({ movieId, movie }) => {
  const { id, ...destructedMovie } = movie;
  const authToken = getAuthToken();

  const response = await axios.patch<FavMovie>(
    `${API_URL}/${movieId}`,
    destructedMovie,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.data;
});

export const deleteMovie = createAsyncThunk<number, number>(
  'movies/deleteMovie',
  async (id) => {
    const authToken = getAuthToken();
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return id;
  }
);

const initialState: MovieState = {
  items: [],
  status: 'idle',
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    sortMoviesByTitle(state) {
      state.items.sort((a, b) => a.title.localeCompare(b.title));
    },
    sortMoviesById(state) {
      state.items.sort((a, b) => a.id - b.id);
    },
    sortMoviesByYear(state) {
      state.items.sort(
        (a, b) =>
          new Date(a.releaseDate).getFullYear() -
          new Date(b.releaseDate).getFullYear()
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<FavMovie[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      })
      .addCase(addMovie.fulfilled, (state, action: PayloadAction<FavMovie>) => {
        state.items.unshift(action.payload);
      })
      .addCase(
        updateMovie.fulfilled,
        (state, action: PayloadAction<FavMovie>) => {
          const index = state.items.findIndex(
            (movie) => movie.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteMovie.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            (movie) => movie.id !== action.payload
          );
        }
      );
  },
});

export const { sortMoviesByTitle, sortMoviesById, sortMoviesByYear } = movieSlice.actions;

export default movieSlice.reducer;
