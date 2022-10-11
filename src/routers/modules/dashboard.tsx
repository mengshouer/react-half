import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import LayoutIndex from "@/Layout/MainLayout";
import { RouteObject } from "react-router-dom";

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/dashboard",
    children: [
      {
        path: "dataVisualize",
        element: lazyLoad(
          lazy(() => import("@/pages/dashboard/dataVisualize"))
        ),
      },
      {
        path: "embedded",
        element: lazyLoad(lazy(() => import("@/pages/dashboard/embedded"))),
      },
    ],
  },
];

export default dashboardRouter;
