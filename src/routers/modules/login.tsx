import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "react-router-dom";
import LoginIndex from "@/Layout/Login";

// 登录模块
const loginRouter: Array<RouteObject> = [
  {
    element: <LoginIndex />,
    children: [
      {
        path: "/login",
        element: lazyLoad(lazy(() => import("@/pages/login"))),
      },
    ],
  },
];

export default loginRouter;
