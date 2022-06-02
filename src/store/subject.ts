import { AnyAction, Dispatch } from 'redux';
import { getSubjects } from '../api/subject';
import { State, Subject } from '../types';

enum ActionTypes {
  SetSubjects = 'subjects/set',
}

export const subjectsActions = {
  setSubjects: (subjects: Subject[]): AnyAction => ({
    type: ActionTypes.SetSubjects,
    value: subjects,
  }),

  loadSubjects: () => async (dispatch: Dispatch<AnyAction>) => {
    const subjects = await getSubjects();

    dispatch(subjectsActions.setSubjects(subjects));
  },
};

export const subjectsSelectors = {
  getSubjects: (state: State): Subject[] => state.subjects,
};

export const subjectsReducer = (state: Subject[] = [], action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SetSubjects:
      return [...action.value];
    default:
      return state;
  }
};
