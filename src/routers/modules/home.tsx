import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "@/routers/interfaces";
import LayoutIndex from "@/Layout/MainLayout";

// 首页模块
const homeRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/home",
        element: lazyLoad(lazy(() => import("@/pages/home"))),
        meta: {
          requiresAuth: true,
          title: "首页",
          key: "home",
        },
      },
    ],
  },
];

export default homeRouter;
