import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { SignIn } from './components/Authorization/SignIn';
import { SignUp } from './components/Authorization/SignUp';
import { HomePage } from './components/HomePage/HomePage';
import { TranslatorProfile } from './components/TranslatorProfile/TranslatorProfile';
import { UserProfile } from './components/UserProfile/UserProfile';
import { AccountType } from './enums';
import { languagesActions } from './store/language';
import { subjectsActions } from './store/subject';
import { userActions, userSelectors } from './store/user';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);

  useEffect(() => {
    dispatch(userActions.loadUser());
    dispatch(subjectsActions.loadSubjects());
    dispatch(languagesActions.loadLanguages());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile" element={user?.accountType === AccountType.User ? <UserProfile /> : <TranslatorProfile />} />
    </Routes>
  );
};
