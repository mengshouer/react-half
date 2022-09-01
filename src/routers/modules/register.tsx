import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "@/routers/interfaces";
import LoginIndex from "@/Layout/Login";

// 注册模块
const registerRouter: Array<RouteObject> = [
  {
    element: <LoginIndex />,
    children: [
      {
        path: "/register",
        element: lazyLoad(lazy(() => import("@/pages/register"))),
        meta: {
          requiresAuth: false,
          title: "注册页",
          key: "register",
        },
      },
    ],
  },
];

export default registerRouter;
