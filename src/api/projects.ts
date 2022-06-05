import { ProjectStatus } from '../enums';
import { Project } from '../types';
import { translatorApi } from './apis';
import { request } from './baseWithAuthorization';

export const getProjects = (projectStatus: ProjectStatus): Promise<Project[]> => {
  return request(`${translatorApi}/api/Projects?status=${projectStatus}`);
};

export const getAvailableProjects = (
  subjectId: number,
  sourceLangId: number,
  targetLangId: number,
): Promise<Project[]> => {
  return request(`${translatorApi}/api/Projects/active?subjectId=${subjectId}&sourceLangId=${sourceLangId}&targetLangId=${targetLangId}`);
};

export const joinProject = (projectId: number, targetLangId: number): Promise<void> => {
  return request(`${translatorApi}/api/Projects/${projectId}/${targetLangId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
