interface UserCredentials {
  id: number;
  username: string;
}

interface Request {
  user?: UserCredentials;
}
