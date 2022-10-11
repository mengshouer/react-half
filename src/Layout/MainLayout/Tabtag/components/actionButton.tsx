import { Dropdown, Menu } from "antd";
import { observer, useStore } from "@/store";
import { SettingOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

function ActionButton() {
  const { menuStore } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabList = menuStore.tabList;

  // close tab
  const closeMultipleTab = (tabPath: string) => {
    const handleTabsList = tabList.filter((item) => {
      return item.path === tabPath || item.path === "/home";
    });
    menuStore.setTbaList(handleTabsList);
    tabPath ?? navigate("/");
  };

  const items = [
    {
      key: "1",
      label: <span>关闭当前</span>,
      onClick: () => menuStore.removeTab(pathname),
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
  ];

  const menu = <Menu items={items} />;
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
