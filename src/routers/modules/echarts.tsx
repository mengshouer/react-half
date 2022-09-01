import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import LayoutIndex from "@/Layout/MainLayout";
import { RouteObject } from "@/routers/interfaces";

// echarts 模块
const echartsRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/echarts",
    meta: {
      title: "Echarts",
    },
    children: [
      {
        path: "waterChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/waterChart"))),
        meta: {
          requiresAuth: true,
          title: "水型图",
          key: "waterChart",
        },
      },
      {
        path: "columnChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/columnChart"))),
        meta: {
          requiresAuth: true,
          title: "柱状图",
          key: "columnChart",
        },
      },
      {
        path: "lineChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/lineChart"))),
        meta: {
          requiresAuth: true,
          title: "折线图",
          key: "lineChart",
        },
      },
      {
        path: "pieChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/pieChart"))),
        meta: {
          requiresAuth: true,
          title: "饼图",
          key: "pieChart",
        },
      },
      {
        path: "radarChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/radarChart"))),
        meta: {
          requiresAuth: true,
          title: "雷达图",
          key: "radarChart",
        },
      },
      {
        path: "nestedChart",
        element: lazyLoad(lazy(() => import("@/pages/echarts/nestedChart"))),
        meta: {
          requiresAuth: true,
          title: "嵌套环形图",
          key: "nestedChart",
        },
      },
    ],
  },
];

export default echartsRouter;
