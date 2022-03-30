export const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  const result: Result<T> = await response.json();

  if (result.isSuccess) {
    return result.data;
  }

  throw new Error(result.errorMessage);
};
