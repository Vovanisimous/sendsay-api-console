import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { LoginForm } from "../../components/login_form/LoginForm";
import { RootState } from "../../redux/app/store";
import { authenticationCheckAction } from "../../redux/sagas/auth";
import "./Login.css";
import { ReactComponent as Logo } from "../../icons/LOGO.svg";

export const Login = () => {
  const history = useHistory();
  const user: any = useSelector<RootState>((state) => state.auth);
  const dispatch = useDispatch();

  dispatch(authenticationCheckAction());
  if (user.session) {
    history.push("/main");
  }

  return (
    <div className="main-container">
      <Logo id="logo" />
      <LoginForm />
      <a href="https://github.com/Vovanisimous" id="github-link">
        @Vovanisimous
      </a>
    </div>
  );
};
