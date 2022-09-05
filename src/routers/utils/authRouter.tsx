import { useLocation, matchRoutes, Navigate } from "react-router-dom";
import { rootRouter } from "@/routers";
import { useStore } from "@/store";

/**
 * @description 路由守卫组件
 * */
export default function AuthRouter(props: { children: JSX.Element }) {
  const { pathname } = useLocation();
  if (pathname === "/login") return props.children;
  const matchroute = matchRoutes(rootRouter, pathname);
  // * 如果访问的地址没有在路由表中重定向到403页面
  if (!matchroute) return <Navigate to="/403" />;
  const { route }: any = matchroute[matchroute.length - 1];
  // * 判断当前路由是否需要访问权限(不需要权限直接放行)
  if (!route.meta?.requiresAuth) return props.children;
  if (!localStorage.getItem("auth-token"))
    return <Navigate to="/login" replace />;
  // * 权限正常， 正常访问页面 (目前未实现错误token的判断)
  return props.children;
}
