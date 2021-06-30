import React from "react";
import { Header } from "../../components/header/Header";
import { Console } from "../../components/console/Console";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";

export const Main = () => {
  const user: any = useSelector<RootState>((state) => state.auth);
  const history: any = useSelector<RootState>(
    (state) => state.requestHistory.requestHistory
  );
  return (
    <div>
      <Header user={user} history={history} />
      <Console />
    </div>
  );
};
