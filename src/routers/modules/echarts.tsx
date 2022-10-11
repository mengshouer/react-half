import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import LayoutIndex from "@/Layout/MainLayout";
import { RouteObject } from "react-router-dom";

// echarts 模块
const echartsRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/echarts",
    children: [
      {
        path: "waterChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/waterChart"))),
      },
      {
        path: "columnChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/columnChart"))),
      },
      {
        path: "lineChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/lineChart"))),
      },
      {
        path: "pieChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/pieChart"))),
      },
      {
        path: "radarChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/radarChart"))),
      },
      {
        path: "nestedChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/nestedChart"))),
      },
    ],
  },
];

export default echartsRouter;
