import { createElement } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useStore, observer } from "@/store";

function CollapseIcon() {
  const { layoutStore } = useStore();
  return (
    <div>
      {createElement(
        layoutStore.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "collapsed",
          onClick: () => {
            layoutStore.changeCollapsed();
          },
        }
      )}
    </div>
  );
}

export default observer(CollapseIcon);
