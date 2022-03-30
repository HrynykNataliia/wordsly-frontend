import { request } from './baseWithAuthorization';

export const getUser = (): Promise<User> => {
  return request('https://192.168.0.104:7146/api/Users');
};
