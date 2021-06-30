import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as Logo } from "../../icons/LOGO.svg";
import "./Header.css";
import { HistoryRequestContainer } from "../history_request_container/HistoryRequestContainer";
import { logoutAction } from "../../redux/sagas/auth";
import { useHistory } from "react-router";

export const Header = (props: { user: any; history: any }) => {
  const { user, history } = props;
  const dispatch = useDispatch();
  const historyRouter = useHistory();

  const onLogout = async () => {
    await dispatch(logoutAction());
    historyRouter.push("/");
  };

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
          <button onClick={onLogout}>Выйти</button>
          <button>Hello</button>
        </div>
      </div>
      <div id="second-row-container">
        {history.map((item: { request: any; response: any }, index: number) => (
          <HistoryRequestContainer
            request={item.request}
            response={item.response}
            index={index}
            dispatch={dispatch}
            key={item.request.action}
          />
        ))}
      </div>
    </div>
  );
};
