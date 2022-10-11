import AntdSvg from "@/assets/logo/antd.svg";
import ReactSvg from "@/assets/logo/react.svg";
import { useStore, observer } from "@/store";

function Logo() {
  const { layoutStore } = useStore();
  const logoStyles = { width: layoutStore.collapsed ? 80 : 200 };
  const imgStyles = { marginRight: layoutStore.collapsed ? "2px" : "20px" };

  return (
    <div className="logo" style={logoStyles}>
      <img src={ReactSvg} alt="react" style={imgStyles} />
      <img src={AntdSvg} alt="antd" />
    </div>
  );
}

export default observer(Logo);
