import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import lazyLoad from "@/routers/utils/lazyLoad";
import LayoutIndex from "@/Layout/MainLayout";

// Content内的错误页面模块
const contentErrorRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/error",
    children: [
      {
        path: "403",
        element: lazyLoad(lazy(() => import("@/components/ErrorPages/403"))),
      },
      {
        path: "404",
        element: lazyLoad(lazy(() => import("@/components/ErrorPages/404"))),
      },
      {
        path: "500",
        element: lazyLoad(lazy(() => import("@/components/ErrorPages/500"))),
      },
    ],
  },
];

export default contentErrorRouter;
