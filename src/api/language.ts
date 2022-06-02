import { Language } from '../types';
import { adminApi } from './apis';
import { request } from './base';

export const getLanguages = async (): Promise<Language[]> => {
  return request(`${adminApi}/api/Languages`);
};
