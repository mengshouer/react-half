import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import LayoutHeader from "@/Layout/MainLayout/Header";
import LayoutSider from "@/Layout/MainLayout/Sider";
import Tabtag from "./Tabtag";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { observer } from "mobx-react-lite";
import { memo } from "react";
import { useStore } from "@/store";
import "antd/dist/antd.min.css";
import "./index.less";

const { Content } = Layout;
const layoutStyles = { minHeight: "100vh" };
const contentStyles = { margin: "0 3px" };
const themes = {
  light: "https://cdn.jsdelivr.net/npm/antd@4.22.7/dist/antd.css",
  dark: "https://cdn.jsdelivr.net/npm/antd@4.22.7/dist/antd.dark.css",
};

function LayoutIndex() {
  const { layoutStore } = useStore();

  return (
    <ThemeSwitcherProvider defaultTheme={layoutStore.theme} themeMap={themes}>
      <Layout style={layoutStyles} className="container">
        <LayoutHeader />
        <Layout>
          <LayoutSider />
          <Content style={contentStyles}>
            <Tabtag />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ThemeSwitcherProvider>
  );
}

export default memo(observer(LayoutIndex));
