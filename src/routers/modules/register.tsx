import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "react-router-dom";
import LoginIndex from "@/Layout/Login";

// 注册模块
const registerRouter: Array<RouteObject> = [
  {
    element: <LoginIndex />,
    children: [
      {
        path: "/register",
        element: lazyLoad(lazy(() => import("@/pages/register"))),
      },
    ],
  },
];

export default registerRouter;
