export function authToken() {
  const authToken = localStorage.getItem('access_token');

  if (!authToken || typeof authToken === 'undefined') return null;

  return authToken;
}
