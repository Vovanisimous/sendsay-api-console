import React from "react";
import { LoginForm } from "../../components/login_form/LoginForm";
import "./Login.css";
import { ReactComponent as Logo } from "../../icons/LOGO.svg";

export const Login = () => {
  return (
    <div className="main-container">
      <Logo id="logo" />
      <LoginForm />
      <a href="https://github.com/Vovanisimous" id="github-link">@Vovanisimous</a>
    </div>
  );
};
