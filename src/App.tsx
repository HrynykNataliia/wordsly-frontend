import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { SignIn } from './components/Authorization/SignIn';
import { SignUp } from './components/Authorization/SignUp';
import { HomePage } from './components/HomePage/HomePage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};
