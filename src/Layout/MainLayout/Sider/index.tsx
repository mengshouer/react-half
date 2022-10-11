import { memo } from "react";
import { Layout } from "antd";
import { useStore, observer } from "@/store";
import MenuList from "./components/menuList";
import "./index.less";

function LayoutSider() {
  const { layoutStore } = useStore();

  return (
    <Layout.Sider
      theme={layoutStore.theme}
      width={200}
      trigger={null}
      collapsible
      collapsed={layoutStore.collapsed}
    >
      <MenuList />
    </Layout.Sider>
  );
}

export default memo(observer(LayoutSider));
