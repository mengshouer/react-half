import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import LayoutIndex from "@/Layout/MainLayout";
import { RouteObject } from "@/routers/interfaces";

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/dashboard",
    meta: {
      title: "Dashboard",
    },
    children: [
      {
        path: "dataVisualize",
        element: lazyLoad(
          lazy(() => import("@/pages/dashboard/dataVisualize"))
        ),
        meta: {
          requiresAuth: true,
          title: "数据可视化",
          key: "dataVisualize",
        },
      },
      {
        path: "embedded",
        element: lazyLoad(lazy(() => import("@/pages/dashboard/embedded"))),
        meta: {
          requiresAuth: true,
          title: "内嵌页面",
          key: "embedded",
        },
      },
    ],
  },
];

export default dashboardRouter;
