import { Avatar, Modal, Menu, Dropdown, message } from "antd";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const styles = { margin: "8px" };

export default function AvatarIcon() {
  const navigate = useNavigate();

  // 退出登录
  const logout = () => {
    Modal.confirm({
      title: "温馨提示 🧡",
      icon: <ExclamationCircleOutlined />,
      content: "是否确认退出登录？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        localStorage.setItem("auth-token", "");
        message.success("退出登录成功！");
        navigate("/login");
      },
    });
  };

  // 点击菜单
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span className="dropdown-item">首页</span>,
          onClick: () => navigate("/home"),
        },
        {
          key: "2",
          label: <span className="dropdown-item">修改密码</span>,
          onClick: () => navigate("/changeinfo"),
        },
        {
          type: "divider",
        },
        {
          key: "3",
          label: <span className="dropdown-item">退出登录</span>,
          onClick: logout,
        },
      ]}
    ></Menu>
  );

  return (
    <div className="userinfo">
      <Dropdown overlay={menu} placement="bottom" arrow trigger={["click"]}>
        <Avatar size="large" icon={<UserOutlined />} />
      </Dropdown>
      <span style={styles}>admin</span>
    </div>
  );
}
