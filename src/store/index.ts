import { createContext, useContext } from "react";
import UserStore from "./modules/user";
import LayoutStore from "./modules/layout";
import { observer } from "mobx-react-lite";

const rootStore = {
  userStore: UserStore,
  layoutStore: LayoutStore,
};

export { observer };
export const useStore = () => useContext(createContext(rootStore));
