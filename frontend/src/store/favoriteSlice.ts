import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchMoviesApi,
  addMovieApi,
  updateMovieApi,
  deleteMovieApi,
} from '../services/FavoritesAPI';

const initialState: MovieState = {
  items: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  crudStatus: 'idle',
  crudError: null,
};

export const fetchMovies = createAsyncThunk<FavMovie[]>(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMoviesApi();
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch movies.');
    }
  },
);

export const addMovie = createAsyncThunk<FavMovie, FavMovie>(
  'movies/addMovie',
  async (movie, { rejectWithValue }) => {
    try {
      const response = await addMovieApi(movie);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to add the movie.');
    }
  },
);

export const updateMovie = createAsyncThunk<
  FavMovie,
  { movieId: number; movie: FavMovie }
>('movies/updateMovie', async ({ movieId, movie }, { rejectWithValue }) => {
  try {
    const response = await updateMovieApi(movieId, movie);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to update the movie.');
  }
});

export const deleteMovie = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('movies/deleteMovie', async (id, { rejectWithValue }) => {
  try {
    await deleteMovieApi(id);
    return id;
  } catch (error) {
    return rejectWithValue('Failed to delete the movie.');
  }
});

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
          new Date(b.releaseDate).getFullYear(),
      );
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clearCrudError(state) {
      state.crudError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.crudStatus = 'idle';
        state.crudError = null;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<FavMovie[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        },
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addMovie.pending, (state) => {
        state.crudStatus = 'pending';
        state.crudError = null;
      })
      .addCase(addMovie.fulfilled, (state, action: PayloadAction<FavMovie>) => {
        state.items.unshift(action.payload);
        state.crudStatus = 'succeeded';
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.crudStatus = 'failed';
        state.crudError = action.payload as string;
      })
      .addCase(updateMovie.pending, (state) => {
        state.crudStatus = 'pending';
        state.crudError = null;
      })
      .addCase(
        updateMovie.fulfilled,
        (state, action: PayloadAction<FavMovie>) => {
          const index = state.items.findIndex(
            (movie) => movie.id === action.payload.id,
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
          state.crudStatus = 'succeeded';
        },
      )
      .addCase(updateMovie.rejected, (state, action) => {
        state.crudStatus = 'failed';
        state.crudError = action.payload as string;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.crudStatus = 'pending';
        state.crudError = null;
      })
      .addCase(
        deleteMovie.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            (movie) => movie.id !== action.payload,
          );
          state.crudStatus = 'succeeded';
        },
      )
      .addCase(deleteMovie.rejected, (state, action) => {
        state.crudStatus = 'failed';
        state.crudError = action.payload as string;
      });
  },
});

export const {
  sortMoviesByTitle,
  sortMoviesById,
  sortMoviesByYear,
  setSearchQuery,
  clearCrudError,
} = movieSlice.actions;

export default movieSlice.reducer;
