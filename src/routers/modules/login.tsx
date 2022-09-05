import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "@/routers/interfaces";
import LoginIndex from "@/Layout/Login";

// 登录模块
const loginRouter: Array<RouteObject> = [
  {
    element: <LoginIndex />,
    children: [
      {
        path: "/login",
        element: lazyLoad(lazy(() => import("@/pages/login"))),
        meta: {
          requiresAuth: false,
          title: "登录页",
          key: "login",
        },
      },
    ],
  },
];

export default loginRouter;
