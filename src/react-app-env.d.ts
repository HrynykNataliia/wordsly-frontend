/// <reference types="react-scripts" />

enum AccountType {
  User = 1,
  Translator = 2,
  Admin = 3,
}
interface Result<T> {
  isSuccess: boolean;
  isFailure: boolean;
  errorMessage: string;
  errorCode: string;
  data: T;
}

interface Tokens {
  authorizationToken: string;
  refreshToken: string;
}

interface SignUpModel {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  accountType: number;
}

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: AccountType;
}

interface State {
  user: User | null;
}
