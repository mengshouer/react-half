import { Tooltip } from "antd";
import { useStore, observer } from "@/store";
import MoonSvg from "@/assets/header/moon.svg";
import SunSvg from "@/assets/header/sun.svg";

const Moon = () => {
  return <img src={MoonSvg} alt="Moon" />;
};

const Sun = () => {
  return <img src={SunSvg} alt="Sun" />;
};

function SwitchTheme() {
  const { layoutStore } = useStore();

  return (
    <Tooltip
      title={
        layoutStore.theme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
    >
      <span>
        <div
          className="switch-theme"
          onClick={() => {
            layoutStore.changeTheme();
          }}
        >
          {layoutStore.theme === "dark" ? <Sun /> : <Moon />}
        </div>
      </span>
    </Tooltip>
  );
}

export default observer(SwitchTheme);
