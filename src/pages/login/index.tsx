import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { request } from "@/utils/request";
import { useMutation } from "react-query";
import { ILoginForm } from "@/api/interfaces";
import { UserOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import { useCallback } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { mutateAsync: login, isLoading } = useMutation(
    (data: ILoginForm) =>
      request.post("/auth/login", data).then((res) => res.data),
    {
      onSuccess: (data: any) => {
        if (data.data.token) {
          localStorage.setItem("auth-token", data.data.token);
          message.success("登录成功");
          navigate("/");
        } else {
          message.error(`登录失败：${data.code}`);
        }
      },

      onError: (error) => {
        message.error(`登录失败：${error}`);
      },
    }
  );

  const onFinish = useCallback(
    (values: ILoginForm) => {
      login(values);
    },
    [login]
  );

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
        initialValue={"admin"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名：admin" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        initialValue={"123456"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password
          autoComplete="new-password"
          placeholder="密码：123456"
          value={"123456"}
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
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
