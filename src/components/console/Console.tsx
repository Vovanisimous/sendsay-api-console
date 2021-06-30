import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/ru";
import api from "../../helpers/sendsay";
import "./Console.css";
import { setHistory } from "../../redux/features/request_history/requestHistorySlice";
import { RootState } from "../../redux/app/store";

export const Console = () => {
  const requestState = useSelector<RootState, any>(
    (state) => state.requestHistory.request
  );
  const responseState = useSelector<RootState, any>(
    (state) => state.requestHistory.response
  );
  const [requestValue, setRequestValue] = useState({});
  const [responseValue, setResponseValue] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setRequestValue(requestState);
    setResponseValue(responseState);
  }, [requestState, responseState]);

  const insertRequestToLocalStorage = (request: any, response: any) => {
    if (!("action" in request)) return;
    dispatch(setHistory({ request, response }));
  };

  const onSendRequest = async () => {
    try {
      const response: string = await api.sendsay.request(requestValue);
      setResponseValue(response);
      console.log(responseValue);
      insertRequestToLocalStorage(requestValue, response);
    } catch (err: any) {
      setResponseValue(err);
      insertRequestToLocalStorage(requestValue, err);
    }
  };

  return (
    <div>
      <div id="consoles-container">
        <div className="console-container">
          <span className="span-text">Запрос:</span>
          <JSONInput
            id="request-input"
            placeholder={requestValue}
            theme={"light_mitsuketa_tribute"}
            confirmGood={false}
            locale={locale}
            height="500px"
            width="100%"
            onChange={(val: any) => setRequestValue(val.jsObject)}
            colors={{
              default: "black",
              background: "white",
            }}
            style={{
              contentBox: {
                color: "black",
              },
              container: {
                borderRadius: 5,
                border: "1px solid rgba(0, 0, 0, 0.2)",
              },
            }}
          />
        </div>
        <div className="console-container">
          <span className="span-text">Ответ:</span>
          <JSONInput
            id="response-input"
            placeholder={responseValue}
            viewOnly
            confirmGood={false}
            theme={"light_mitsuketa_tribute"}
            locale={locale}
            height="500px"
            width="100%"
            onChange={(val: any) => setRequestValue(val.jsObject)}
            colors={{
              default: "black",
              background: "white",
            }}
            style={{
              contentBox: {
                color: "black",
              },
              container: {
                borderRadius: 5,
                border: "1px solid rgba(0, 0, 0, 0.2)",
              },
            }}
          />
        </div>
      </div>
      <div id="footer-container">
        <button onClick={onSendRequest} id="send-button">
          Отправить
        </button>
        <a href="https://github.com/Vovanisimous" id="github-link">
          @Vovanisimous
        </a>
      </div>
    </div>
  );
};
