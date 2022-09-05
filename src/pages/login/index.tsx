import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { ILoginForm } from "@/api/interfaces";
import { UserOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import { userLogin } from "@/api/modules/login";
import { useStore } from "@/store";

const LoginForm = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { runAsync: runLogin } = useRequest((params) => userLogin(params), {
    manual: true,
    throttleWait: 1000,
  });

  // 登录
  const onFinish = async (loginForm: ILoginForm) => {
    try {
      setLoading(true);
      await runLogin(loginForm)
        .then((res: any) => {
          if (res.code >= 200 && res.code < 300 && res.data.access_token) {
            localStorage.setItem("auth-token", res.data.access_token);
            message.success("登录成功！");
            userStore.setUsername(loginForm.username);
            navigate("/home");
          } else message.error(res.data);
        })
        .catch((err) => {
          message.error(err.message);
        });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password
          autoComplete="new-password"
          placeholder="请输入密码"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<UserOutlined />}
        >
          登录
        </Button>
        <Button
          onClick={() => {
            navigate("/register");
          }}
          icon={<UserAddOutlined />}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
