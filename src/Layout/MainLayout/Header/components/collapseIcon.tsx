import { useCallback } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useStore, observer } from "@/store";

const visibleStyles = { opacity: 1, cursor: "pointer" };
const hiddenStyles = { opacity: 0 };
function CollapseIcon() {
  const { layoutStore } = useStore();
  const handleClick = useCallback(() => {
    layoutStore.changeCollapsed();
  }, []);
  return (
    <div className="collapsed" onClick={handleClick}>
      <MenuFoldOutlined
        style={layoutStore.collapsed ? hiddenStyles : visibleStyles}
      />
      <MenuUnfoldOutlined
        style={layoutStore.collapsed ? visibleStyles : hiddenStyles}
      />
    </div>
  );
}

export default observer(CollapseIcon);
