export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm extends ILoginForm {
  inviteCode: string;
}

export interface ITheme {
  theme: "light" | "dark";
}

export interface ITabs {
  title: string;
  path: string;
}

export interface MenuOptions {
  path: string;
  title: string;
  icon?: string;
  isLink?: string;
  close?: boolean;
  children?: MenuOptions[];
}

export interface DeleteCKTableDataType {
  key: number;
  name: string;
  description: string;
}

export interface UpdateCK {
  cookie: string;
  remarks?: string;
}
