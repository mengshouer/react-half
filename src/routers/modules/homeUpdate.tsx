import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "@/routers/interfaces";
import LayoutIndex from "@/Layout/MainLayout";

// 更新CK模块
const homeRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/home",
        children: [
          {
            path: "update",
            element: lazyLoad(lazy(() => import("@/pages/home/update"))),
            meta: {
              requiresAuth: true,
              title: "更新CK",
              key: "updateCK",
            },
          },
        ],
      },
    ],
  },
];

export default homeRouter;
