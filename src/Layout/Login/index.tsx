import logo from "@/assets/logo/react.svg";
import { Outlet } from "react-router-dom";
import "./index.less";

export default function LoginIndex() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <div className="login-logo">
            <img className="login-icon" src={logo} alt="logo" />
            <span className="logo-text">Half-Half</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
