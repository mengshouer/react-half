import { Dropdown, Menu } from "antd";
import { observer, useStore } from "@/store";
import { SettingOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

function ActionButton() {
  const { layoutStore } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabList = layoutStore.tabList;

  // close tab
  const closeMultipleTab = (tabPath: string) => {
    const handleTabsList = tabList.filter((item) => {
      return item.path === tabPath || item.path === "/home";
    });
    layoutStore.setTbaList(handleTabsList);
    tabPath ?? navigate("/");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span>关闭当前</span>,
          onClick: () => layoutStore.removeTab(pathname),
        },
        {
          key: "2",
          label: <span>关闭其它</span>,
          onClick: () => closeMultipleTab(pathname),
        },
        {
          key: "3",
          label: <span>关闭所有</span>,
          onClick: () => closeMultipleTab(""),
        },
      ]}
    />
  );
  return (
    <Dropdown
      overlay={menu}
      placement="bottom"
      arrow={{ pointAtCenter: true }}
      trigger={["click"]}
    >
      <span>
        <SettingOutlined />
      </span>
    </Dropdown>
  );
}

export default observer(ActionButton);
