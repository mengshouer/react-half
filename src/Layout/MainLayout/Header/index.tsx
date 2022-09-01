import { Layout } from "antd";
import { observer } from "@/store";
import Logo from "./components/logo";
import CollapseIcon from "./components/collapseIcon";
import AvatarIcon from "./components/avatarIcon";
import SwitchTheme from "./components/switchTheme";
import GithubIcon from "./components/githubIcon";
import "./index.less";

function LayoutHeader() {
  const { Header } = Layout;

  return (
    <Header>
      <Logo />
      <div className="header-left">
        <CollapseIcon />
      </div>
      <div className="header-right">
        <GithubIcon />
        <SwitchTheme />
        <AvatarIcon />
      </div>
    </Header>
  );
}

export default observer(LayoutHeader);
