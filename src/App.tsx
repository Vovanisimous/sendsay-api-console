import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Main } from "./pages/main/Main";
import { authenticationCheckAction } from "./redux/sagas/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticationCheckAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Route exact path={"/"} component={Login} />
      <Route exact path={"/main"} component={Main} />
    </BrowserRouter>
  );
}

export default App;
