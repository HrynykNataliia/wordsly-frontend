import { Subject } from '../types';
import { adminApi } from './apis';
import { request } from './base';

export const getSubjects = async (): Promise<Subject[]> => {
  return request(`${adminApi}/api/Subjects`);
};
