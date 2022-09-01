import { useEffect, useState } from "react";
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
  const { layoutStore } = useStore();

  const [activeValue, setActiveValue] = useState(pathname);

  const onChange = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    addTab();
    setActiveValue(pathname);
  }, [pathname]);

  // add tabs
  const addTab = () => {
    const route = matchRoutes(routerArray, pathname);
    if (!route) return;
    if (layoutStore.tabList.every((item) => item.path !== pathname)) {
      route.forEach((item: any) => {
        if (item.pathname === pathname) {
          layoutStore.addTab({
            title: item.route.meta!.title || item.route.title,
            path: pathname,
          });
        }
      });
    }
  };

  const removeTab = (tabPath: string) => {
    if (tabPath === "/home") return;
    if (pathname === tabPath) {
      layoutStore.tabList.forEach((item, index) => {
        if (item.path !== pathname) return;
        const nextTab =
          layoutStore.tabList[index + 1] || layoutStore.tabList[index - 1];
        if (!nextTab) return;
        navigate(nextTab.path);
      });
    }
    layoutStore.removeTab(tabPath);
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
          defaultActiveKey="1"
          onChange={onChange}
          tabBarExtraContent={<ActionButton />}
        >
          {layoutStore.tabList.map((item) => {
            return (
              <TabPane
                key={item.path}
                tab={
                  <span>
                    {item.path === "/home" ? <HomeFilled /> : ""}
                    {item.title}
                  </span>
                }
                closable={item.path !== "/"}
              ></TabPane>
            );
          })}
        </Tabs>
      </div>
    </>
  );
}

export default observer(Tabtag);
