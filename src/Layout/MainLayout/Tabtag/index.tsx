import { useCallback, useEffect, useState } from "react";
import { Tabs } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";
import { useStore, observer } from "@/store";
import { routerArray } from "@/routers";
import ActionButton from "./components/actionButton";
import "./index.less";

function Tabtag() {
  const { TabPane } = Tabs;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { menuStore } = useStore();

  const [activeValue, setActiveValue] = useState(pathname);

  const onChange = useCallback((path: string) => {
    navigate(path);
  }, []);

  useEffect(() => {
    addTab();
    setActiveValue(pathname);
  }, [pathname]);

  // add tabs
  const addTab = () => {
    const route = matchRoutes(routerArray, pathname);
    if (!route) return;
    if (menuStore.tabList.every((item) => item.path !== pathname)) {
      route.forEach((item: any) => {
        if (item.pathname === pathname) {
          menuStore.addTab(pathname);
        }
      });
    }
  };

  const removeTab = (tabPath: string) => {
    if (pathname === tabPath) {
      menuStore.tabList.forEach((item, index) => {
        if (item.path !== pathname) return;
        const nextTab =
          menuStore.tabList[index + 1] || menuStore.tabList[index - 1];
        if (!nextTab) return;
        navigate(nextTab.path);
      });
    }
    menuStore.removeTab(tabPath);
  };

  return (
    <>
      <div className="header-tabs">
        <Tabs
          activeKey={activeValue}
          hideAdd
          type="editable-card"
          onEdit={(path) => {
            removeTab(path as string);
          }}
          onChange={onChange}
          tabBarExtraContent={<ActionButton />}
        >
          {menuStore.tabList.map((item) => {
            return (
              <TabPane
                key={item.path}
                tab={
                  <span>
                    {item.path === "/home" ? <HomeFilled /> : ""}
                    {item.label}
                  </span>
                }
                closable={item.path !== "/home"}
              ></TabPane>
            );
          })}
        </Tabs>
      </div>
    </>
  );
}

export default observer(Tabtag);
