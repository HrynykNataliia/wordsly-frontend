import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getLanguages } from './api/language';
import { getSubjects } from './api/subject';
import './App.scss';
import { SignIn } from './components/Authorization/SignIn';
import { SignUp } from './components/Authorization/SignUp';
import { AvailableProjects } from './components/AvailableProjects/AvailableProjects';
import { HomePage } from './components/HomePage/HomePage';
import { TranslatorProfile } from './components/TranslatorProfile/TranslatorProfile';
import { UserProfile } from './components/UserProfile/UserProfile';
import { TranslatorProjects } from './components/UserProjects/TranslatorProjects';
import { UserProjects } from './components/UserProjects/UserProjects';
import { AccountType } from './enums';
import { languagesActions } from './store/language';
import { subjectsActions } from './store/subject';
import { userActions, userSelectors } from './store/user';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);

  useEffect(() => {
    (async () => {
      const newSubjects = await getSubjects();
      const newLanguages = await getLanguages();

      dispatch(subjectsActions.setSubjects(newSubjects));
      dispatch(languagesActions.setLanguages(newLanguages));
      dispatch(userActions.loadUser());
    })();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile" element={user?.accountType === AccountType.User ? <UserProfile /> : <TranslatorProfile />} />
      <Route path="/projects/my" element={user?.accountType === AccountType.User ? <UserProjects /> : <TranslatorProjects />} />
      <Route path="/projects" element={<AvailableProjects />} />
    </Routes>
  );
};
