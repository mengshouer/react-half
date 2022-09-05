import { useState } from "react";
import { message, Card } from "antd";
import { Input, Button } from "antd";
import { useRequest } from "ahooks";
import { userCKUpdate } from "@/api/modules/handleCK";
import "./index.less";

export default function Home() {
  const [cookie, setCookie] = useState("");
  const [remarks, setRemarks] = useState("");
  const { runAsync: runUpdate } = useRequest((data) => userCKUpdate(data), {
    manual: true,
    throttleWait: 1000,
  });
  const notice = import.meta.env.VITE_APP_NOTICE;

  const InputTextHandle = (e: React.ChangeEvent) => {
    const inputText = (e.target as HTMLInputElement).value;
    const cookie = inputText.match(/pt_key=(.*?);pt_pin=(.*?);/);
    if (cookie) setCookie(cookie[0]);
  };

  const UpdateCookieHandle = async () => {
    if (cookie) {
      await runUpdate({ cookie, remarks }).then((res) => {
        console.log(res);
        message.success("更新成功");
      });
    } else {
      message.error("cookie格式有误，请检查");
    }
  };

  return (
    <Card style={{ margin: "20px 20px" }}>
      {notice ? (
        <div id="content-notice" dangerouslySetInnerHTML={{ __html: notice }} />
      ) : (
        "请在.env文件中配置VITE_APP_NOTICE来设置内容"
      )}
      <Input.Group compact>
        <Input
          onChange={InputTextHandle}
          style={{ width: "calc(100% - 200px)" }}
          placeholder="请输入cookie"
        />
        <Input
          style={{ width: "calc(100% - 200px)" }}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="备注(todo)"
        />
        <Button type="primary" onClick={UpdateCookieHandle}>
          添加/更新
        </Button>
      </Input.Group>
    </Card>
  );
}
