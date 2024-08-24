interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

interface AuthSuccessResponse {
  username: string;
  access_token: string;
  message?: string;
}

interface AuthErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

//Favorite movies
interface FavMovie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  imageUrl: string;
}

interface MovieState {
  items: FavMovie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery: string;
  crudStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  crudError: string | null;
}
