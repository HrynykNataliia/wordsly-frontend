import { AccountType } from './enums';

export interface Result<T> {
  isSuccess: boolean;
  isFailure: boolean;
  errorMessage: string;
  errorCode: string;
  data: T;
}

export interface Tokens {
  authorizationToken: string;
  refreshToken: string;
}

export interface SignUpModel {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  accountType: number;
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: AccountType;
}

export interface UserProjects {
  active: number;
  completed: number;
  waiting: number;
  money: number;
}

export interface PersonalInfo {
  website: string;
  company: string;
}

export interface State {
  user: User | null;
  subjects: Subject[];
}

export interface Subject {
  id: number;
  subject: string;
}
