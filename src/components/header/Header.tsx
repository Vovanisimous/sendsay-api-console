import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import { ReactComponent as Logo } from "../../icons/LOGO.svg";
import "./Header.css";

export const Header = () => {
  const user: any = useSelector<RootState>((state) => state.auth);

  return (
    <div id="header-container">
      <div id="first-row-container">
        <div className="info-container">
          <Logo />
          <span>API-консолька</span>
        </div>
        <div className="info-container">
          <div>
            {user.login} : {user.sublogin}
          </div>
          <button>Выйти</button>
          <button>Hello</button>
        </div>
      </div>
    </div>
  );
};
