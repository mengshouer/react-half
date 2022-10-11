import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "react-router-dom";
import LayoutIndex from "@/Layout/MainLayout";

// 表单页面
const formRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/form",
    children: [
      {
        path: "basic",
        element: lazyLoad(lazy(() => import("@/pages/form/baseForm"))),
      },
      {
        path: "dynamic",
        element: lazyLoad(lazy(() => import("@/pages/form/dynamicForm"))),
      },
    ],
  },
];

export default formRouter;
