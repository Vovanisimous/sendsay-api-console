import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { isMetaProperty } from "typescript";
import { RootState } from "../../redux/app/store";
import { authenticateAction } from "../../redux/sagas/auth";
import { LoginErrorPopup } from "../login_error_popup/LoginErrorPopup";
import { Spinner } from "../spinner/Spinner";
import "./LoginForm.css";

interface ISubmitValues {
  login: string;
  sublogin: string;
  password: string;
}

const validate = (values: ISubmitValues) => {
  const errors: any = {};

  if (!values.login) {
    errors.login = "1";
  }

  if (!values.password) {
    errors.password = "2";
  }

  return errors;
};

export const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector<RootState, string>((state) => state.auth.error);
  const loading = useSelector<RootState, boolean>(
    (state) => state.auth.loading
  );

  const onSubmit = async (values: ISubmitValues) => {
    dispatch(authenticateAction(values));
  };

  return (
    <div className="login-form-container">
      <span className="top-text">API-консолька</span>
      <Form
        validate={validate}
        validateOnBlur
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <div>
            {error && <LoginErrorPopup loginError={error} />}
            <form onSubmit={handleSubmit}>
              <div className="field-container">
                <label>Логин</label>
                <Field
                  name="login"
                  component="input"
                  type="text"
                  id="login"
                  required
                />
              </div>
              <div className="field-container">
                <div className="sublogin-label-span">
                  <label>Сублогин</label>
                  <span className="sublogin-optional-span">Опционально</span>
                </div>
                <Field name="sublogin" component="input" type="text" />
              </div>
              <div className="field-container">
                <label>Пароль</label>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!values.password || !values.login}
              >
                {!loading ? "Войти" : <Spinner />}
              </button>
            </form>
          </div>
        )}
      />
    </div>
  );
};
