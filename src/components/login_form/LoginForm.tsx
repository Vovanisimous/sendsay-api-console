import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
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

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [fieldError, setFieldError] = useState(false);
  const error = useSelector<RootState, string>((state) => state.auth.error);
  const loading = useSelector<RootState, boolean>(
    (state) => state.auth.loading
  );

  const onSubmit = async (values: ISubmitValues) => {
    dispatch(authenticateAction(values));
  };

  const onValidateLogin = (
    e: React.FormEvent<HTMLInputElement>,
    input: "login" | "password"
  ) => {
    const value = e.currentTarget.value;
    const loginField = document.getElementById(input) as HTMLInputElement;
    const regex =
      input === "login"
        ? /^[a-z0-9@._-]+$/i
        : /^[~`!@#$%^&*()_+=[\]\\{}|;':",./<>?a-zA-Z0-9-]+$/;

    if (!value || !regex.test(value)) {
      loginField && loginField.setCustomValidity("123");
      setFieldError(true);
    } else {
      loginField && loginField.setCustomValidity("");
      setFieldError(false);
    }
  };

  return (
    <div className="login-form-container">
      <span className="top-text">API-консолька</span>
      <Form
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
                  onBlur={(e: React.FormEvent<HTMLInputElement>) =>
                    onValidateLogin(e, "login")
                  }
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
                  id="password"
                  onBlur={(e: React.FormEvent<HTMLInputElement>) =>
                    onValidateLogin(e, "password")
                  }
                />
              </div>
              <button
                type="submit"
                disabled={!values.password || !values.login || fieldError}
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
