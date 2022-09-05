// * 获取菜单列表
export const getMenuList = async () => {
  const menu = [
    {
      icon: "HomeOutlined",
      title: "首页",
      path: "/home",
      children: [
        {
          icon: "AppstoreOutlined",
          title: "更新CK",
          path: "/home/update",
        },
        {
          icon: "AppstoreOutlined",
          title: "删除CK",
          path: "/home/delete",
        },
      ],
    },
  ];
  return menu;
};
