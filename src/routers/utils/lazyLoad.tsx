import React, { Suspense } from "react";
import { Spin } from "antd";

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
};
export default function lazyload(
  Comp: React.LazyExoticComponent<React.ComponentType<any>>
): React.ReactNode {
  return (
    <Suspense fallback={<Spin size="large" style={styles} />}>
      <Comp />
    </Suspense>
  );
}
