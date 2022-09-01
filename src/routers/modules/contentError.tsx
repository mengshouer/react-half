import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "@/routers/interfaces";
import LayoutIndex from "@/Layout/MainLayout";

// Content内的错误页面模块
const contentErrorRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "ErrorPages",
    },
    path: "/error",
    children: [
      {
        path: "403",
        element: lazyLoad(lazy(() => import("@/components/ErrorPages/403"))),
        meta: {
          requiresAuth: true,
          title: "403页面",
          key: "403",
        },
      },
      {
        path: "404",
        element: lazyLoad(lazy(() => import("@/components/ErrorPages/404"))),
        meta: {
          requiresAuth: true,
          title: "404页面",
          key: "404",
        },
      },
      {
        path: "500",
        element: lazyLoad(lazy(() => import("@/components/ErrorPages/500"))),
        meta: {
          requiresAuth: true,
          title: "500页面",
          key: "500",
        },
      },
    ],
  },
];

export default contentErrorRouter;
