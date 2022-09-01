export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm extends ILoginForm {
  invitecode: string;
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
