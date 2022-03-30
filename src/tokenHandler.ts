import jwtDecode, { JwtPayload } from 'jwt-decode';
import { refresh } from './api/authorization';

function isJwtExpired(token: string) {
  const { exp } = jwtDecode<JwtPayload>(token);
  const currentTime = new Date().getTime() / 1000;

  if (exp && currentTime > exp) {
    return true;
  }

  return false;
}

export const setTokens = (tokens: Tokens) => {
  localStorage.setItem('authorizationToken', tokens.authorizationToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

export const getAuthorizationToken = async (): Promise<string | null> => {
  const authorizationToken = localStorage.getItem('authorizationToken');
  const refreshToken = getRefreshToken();

  if (!authorizationToken || !refreshToken) {
    return null;
  }

  if (isJwtExpired(authorizationToken)) {
    const newTokens = await refresh({
      authorizationToken,
      refreshToken,
    });

    setTokens(newTokens);

    return newTokens.authorizationToken;
  }

  return authorizationToken;
};