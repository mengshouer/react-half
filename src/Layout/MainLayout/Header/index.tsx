import { memo } from "react";
import { Layout } from "antd";
import Logo from "./components/logo";
import CollapseIcon from "./components/collapseIcon";
import AvatarIcon from "./components/avatarIcon";
import SwitchTheme from "./components/switchTheme";
import GithubIcon from "./components/githubIcon";
import "./index.less";

function LayoutHeader() {
  return (
    <Layout.Header>
      <Logo />
      <div className="header-left">
        <CollapseIcon />
      </div>
      <div className="header-right">
        <GithubIcon />
        <SwitchTheme />
        <AvatarIcon />
      </div>
    </Layout.Header>
  );
}

export default memo(LayoutHeader);
