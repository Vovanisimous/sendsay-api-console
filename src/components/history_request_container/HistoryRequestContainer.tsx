import React, { Dispatch, useState } from "react";
import { ReactComponent as ThreeDots } from "../../icons/three_dots.svg";
import { requestExecutionAction } from "../../redux/sagas/requestHistory";
import { deleteOneHistory } from "../../redux/features/request_history/requestHistorySlice";
import "./HistoryRequestContainer.css";

export const HistoryRequestContainer = (props: {
  request: any;
  response: any;
  index: number;
  dispatch: Dispatch<any>;
}) => {
  const [expand, setExpand] = useState(false);
  const { request, response, index, dispatch } = props;

  const onMenuExpand = () => {
    setExpand(!expand);
  };

  const onRequestExecute = () => {
    dispatch(requestExecutionAction({ request }));
    onMenuExpand();
  };

  const onRequestCopy = () => {
    const input = document.createElement("textarea");
    input.value = JSON.stringify(request);
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    input.remove();
    alert(input.value);
    onMenuExpand();
  };

  const onRequestDelete = () => {
    dispatch(deleteOneHistory({ index }));
    onMenuExpand();
  };

  return (
    <div>
      <button onClick={onMenuExpand} id="history-request-container">
        {response.id === "access_denied" ? (
          <div id="error-history-request"></div>
        ) : (
          <div id="success-history-request"></div>
        )}
        <span>{request.action}</span>
        <ThreeDots />
      </button>
      {expand && (
        <div id="history-request-menu-container">
          <button
            onClick={onRequestExecute}
            className="history-request-menu-button"
            id="execute-button"
          >
            Выполнить
          </button>
          <button
            onClick={onRequestCopy}
            className="history-request-menu-button"
            id="copy-button"
          >
            Скопировать
          </button>
          <button
            onClick={onRequestDelete}
            className="history-request-menu-button"
            id="delete-button"
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};
