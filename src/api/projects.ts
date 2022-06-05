import {
  PaginationResult,
  ProjectInfo,
  StringComment,
  StringModel,
} from '../types';
import { translatorApi } from './apis';
import { request } from './baseWithAuthorization';

export const getProjectStrings = (
  id: string,
  lang: string,
  page: number,
) : Promise<PaginationResult<StringModel>> => {
  return request(`${translatorApi}/api/Projects/${id}/${lang}/${page}`);
};

export const getProjectString = (
  id: string,
  lang: number,
  stringId: number,
) : Promise<StringModel> => {
  return request(`${translatorApi}/api/Projects/${id}/${lang}/strings/${stringId}`);
};

export const getProjectInfo = (
  id: string,
  lang: string,
) : Promise<ProjectInfo> => {
  return request(`${translatorApi}/api/Projects/${id}/${lang}`);
};

export const getComments = (stringId: number, lang: number) : Promise<StringComment[]> => {
  return request(`${translatorApi}/api/Projects/${stringId}/${lang}/comments`);
};

export const sendComment = (stringId: number, lang: number, text: string) : Promise<void> => {
  return request(`${translatorApi}/api/Projects/${stringId}/${lang}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  });
};

export const sendProjectString = (
  id: string,
  lang: number,
  stringId: number,
  text: string,
) : Promise<void> => {
  return request(`${translatorApi}/api/Projects/${id}/${lang}/strings/${stringId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  });
};

export const approveProject = (id: number, lang: number) : Promise<void> => {
  return request(`${translatorApi}/api/Projects/${id}/${lang}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
