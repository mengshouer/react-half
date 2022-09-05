import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "@/routers/interfaces";
import LayoutIndex from "@/Layout/MainLayout";

// 删除CK模块
const homeRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/home",
        children: [
          {
            path: "delete",
            element: lazyLoad(lazy(() => import("@/pages/home/delete"))),
            meta: {
              requiresAuth: true,
              title: "删除CK",
              key: "deleteCK",
            },
          },
        ],
      },
    ],
  },
];

export default homeRouter;
