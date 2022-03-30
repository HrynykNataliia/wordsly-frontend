import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Link
        to="/"
        className="header__logo has-text-primary-dark has-text-weight-light is-size-2"
      >
        Wordsly
      </Link>

      <Link
        to="/sign-in"
        className="header__sign-in is-size-4"
      >
        Sign in
      </Link>
    </header>
  );
};
