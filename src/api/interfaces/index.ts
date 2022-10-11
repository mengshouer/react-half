import type { MenuProps } from "antd";

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
  label: string;
  path: string;
  key: string;
  closable?: boolean;
}

export interface MenuOptions {
  path: string;
  title: string;
  icon?: string;
  isLink?: string;
  close?: boolean;
  children?: MenuOptions[];
}

export type MenuItem = Required<MenuProps>["items"][number];
