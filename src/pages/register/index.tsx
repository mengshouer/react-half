import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { IRegisterForm } from "@/api/interfaces";
import { UserOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import { userRegister } from "@/api/modules/login";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { runAsync: runRegister } = useRequest(
    (params) => userRegister(params),
    {
      manual: true,
      throttleWait: 1000,
    }
  );

  // 注册
  const onFinish = async (registerForm: IRegisterForm) => {
    try {
      setLoading(true);
      console.log(registerForm);
      await runRegister(registerForm)
        .then((res) => {
          console.log(res);
          message.success("注册成功！");
          navigate("/login");
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
        name="inviteCode"
        rules={[{ required: true, message: "请输入邀请码" }]}
      >
        <Input placeholder="请输入邀请码" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
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
