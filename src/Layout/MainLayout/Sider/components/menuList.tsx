import React, { useCallback, useEffect, useState } from "react";
import { Menu, message, Spin } from "antd";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useStore, observer } from "@/store";
import { getMenuList } from "@/api/modules/menulist";
import { MenuOptions, MenuItem } from "@/api/interfaces";

const menuStyles = { height: "100%", borderRight: 0 };

// 定义侧边类型
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function MenuList() {
  const { menuStore } = useStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([pathname]);

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name]);
  };

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = useCallback(
    (menuList: MenuOptions[], newArr: MenuItem[] = []) => {
      menuList.forEach((item: MenuOptions) => {
        if (!item.children?.length) {
          return newArr.push(
            getItem(item.title, item.path, addIcon(item.icon!))
          );
        }
        newArr.push(
          getItem(
            item.title,
            item.path,
            addIcon(item.icon!),
            deepLoopFloat(item.children)
          )
        );
      });
      return newArr;
    },
    []
  );

  const getMenuItem = async () => {
    setLoading(true);
    try {
      const data: { code: number; data: MenuOptions[] } = await getMenuList();
      if (data.code === 401) {
        message.error("登录信息失效，请重新登录！");
        navigate("/login");
      } else if (data.code !== 200) {
        message.error("获取菜单列表失败！");
        return;
      }
      menuStore.setMenuData(data.data);
      menuStore.setMenuList(deepLoopFloat(data.data));
    } finally {
      setLoading(false);
    }
  };

  const onClick: MenuProps["onClick"] = useCallback(
    ({ key }: { key: string }) => {
      navigate(key);
    },
    []
  );

  useEffect(() => {
    getMenuItem();
  }, []);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  return (
    <Spin spinning={loading} tip="Loading...">
      <Menu
        theme="light"
        onClick={onClick}
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={["/home"]}
        style={menuStyles}
        items={menuStore.menuList}
        className="menu"
      />
    </Spin>
  );
}

export default observer(MenuList);
