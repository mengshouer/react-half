import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";

export default function NotNetwork() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home");
  };
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );
}
