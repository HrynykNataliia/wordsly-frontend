import { Result } from '../types';

export const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  const result: Result<T> = await response.json();

  if (result.isSuccess) {
    return result.data;
  }

  if (result.errorMessage === 'The refresh token is not valid.') {
    localStorage.clear();
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  throw new Error(result.errorMessage);
};
