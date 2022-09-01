import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "@/routers/interfaces";
import LayoutIndex from "@/Layout/MainLayout";

// 表单页面
const formRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "FormPages",
    },
    path: "/form",
    children: [
      {
        path: "basic",
        element: lazyLoad(lazy(() => import("@/pages/form/baseForm"))),
        meta: {
          requiresAuth: true,
          title: "基础表单页面",
          key: "basicform",
        },
      },
      {
        path: "dynamic",
        element: lazyLoad(lazy(() => import("@/pages/form/dynamicForm"))),
        meta: {
          requiresAuth: true,
          title: "动态嵌套表单页面",
          key: "dynamicform",
        },
      },
    ],
  },
];

export default formRouter;
