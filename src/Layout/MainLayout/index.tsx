import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import LayoutHeader from "@/Layout/MainLayout/Header";
import LayoutSider from "@/Layout/MainLayout/Sider";
import Tabtag from "./Tabtag";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import "antd/dist/antd.min.css";
import "./index.less";

function LayoutIndex() {
  const { Content } = Layout;
  const { layoutStore } = useStore();
  const themes = {
    light: "https://cdn.jsdelivr.net/npm/antd@4.22.7/dist/antd.css",
    dark: "https://cdn.jsdelivr.net/npm/antd@4.22.7/dist/antd.dark.css",
  };

  return (
    <ThemeSwitcherProvider defaultTheme={layoutStore.theme} themeMap={themes}>
      <Layout style={{ minHeight: "100vh" }} className="container">
        <LayoutHeader />
        <Layout>
          <LayoutSider />
          <Content style={{ margin: "0 3px" }}>
            <Tabtag />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ThemeSwitcherProvider>
  );
}

export default observer(LayoutIndex);
