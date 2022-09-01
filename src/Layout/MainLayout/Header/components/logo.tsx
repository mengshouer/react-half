import AntdSvg from "@/assets/logo/antd.svg";
import ReactSvg from "@/assets/logo/react.svg";
import { useStore, observer } from "@/store";

function Logo() {
  const { layoutStore } = useStore();
  return (
    <div className="logo" style={{ width: layoutStore.collapsed ? 80 : 200 }}>
      <img
        src={ReactSvg}
        alt="react"
        style={{ marginRight: layoutStore.collapsed ? "2px" : "20px" }}
      />
      <img src={AntdSvg} alt="antd" />
    </div>
  );
}

export default observer(Logo);
