import { createContext, useContext } from "react";
import AuthStore from "./modules/auth";
import LayoutStore from "./modules/layout";
import { observer } from "mobx-react-lite";

const rootStore = {
  authStore: AuthStore,
  layoutStore: LayoutStore,
};

export { observer };
export const useStore = () => useContext(createContext(rootStore));
