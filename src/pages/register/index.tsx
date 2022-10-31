import { useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { IRegisterForm } from "@/api/interfaces";
import { useMutation } from "react-query";
import { request } from "@/utils/request";
import { UserOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mutateAsync: register, isLoading } = useMutation(
    (data: IRegisterForm) =>
      request.post("/auth/register", data).then((res) => res.data),
    {
      onSuccess: () => {
        message.success("注册成功");
        navigate("/login");
      },
    }
  );

  const onFinish = useCallback(
    (values: IRegisterForm) => {
      register(values);
    },
    [register]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("注册失败！", errorInfo);
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
      <Form.Item
        name="invitecode"
        rules={[{ required: true, message: "请输入邀请码" }]}
      >
        <Input placeholder="请输入邀请码" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          icon={<UserOutlined />}
        >
          注册
        </Button>
        <Button
          onClick={() => {
            form.resetFields();
          }}
          icon={<UserAddOutlined />}
        >
          reset
        </Button>
      </Form.Item>
    </Form>
  );
}
