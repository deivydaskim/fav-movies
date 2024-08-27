/* Media list */
interface MediaResult<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface Base {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface Movie extends Base {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

interface TV extends Base {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

/* Base media details interfaces */

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

/* Base Media Details interface with common properties */

interface BaseMediaDetails {
  credits: Credits;
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  homepage: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

/* Extended interfaces for MovieDetails and SeriesDetails */

interface MovieDetails extends BaseMediaDetails {
  belongs_to_collection?: string;
  budget: number;
  imdb_id: string;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
}

interface SeriesDetails extends BaseMediaDetails {
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: Season[];
  type: string;
}

/* Media credits */

interface Person {
  id: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface CastMember extends Person {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface CrewMember extends Person {
  department: string;
  job: string;
}

interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

/* Search result */

interface Search {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

interface SearchResult {
  backdrop_path: string;
  id: number;
  name?: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type?: 'tv' | 'movie';
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
}

interface FetchError extends Error {
  status?: number;
}
