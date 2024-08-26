export function getAuthToken() {
  const token = localStorage.getItem('access_token');
  const expirationTime = localStorage.getItem('expiration_time');

  if (!token || !expirationTime) {
    return null;
  }

  if (new Date().getTime() > new Date(expirationTime).getTime()) {
    clearAuthToken();
    return null;
  }

  return token;
}

const TOKEN_EXPIRATION_TIME = import.meta.env.VITE_AUTH_TOKEN_EXPIRATION_TIME;

export function setAuthToken(token: string) {
  localStorage.setItem('access_token', token);
  const expirationDuration = parseInt(TOKEN_EXPIRATION_TIME, 10);
  const expirationTime = new Date(Date.now() + expirationDuration);
  localStorage.setItem('expiration_time', expirationTime.toISOString());
}

export function clearAuthToken() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('expiration_time');
}
