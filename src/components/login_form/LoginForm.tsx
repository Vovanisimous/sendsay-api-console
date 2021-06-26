import React from "react";
import { Form, Field } from 'react-final-form'
import { useDispatch } from "react-redux";
import {authenticateAction} from "../../redux/sagas/auth"
import "./LoginForm.css"

interface ISubmitValues {
   login: string;
   sublogin: string;
   password: string;
}



export const LoginForm = () => {
   const dispatch = useDispatch()

   const onSubmit = async(values: ISubmitValues) => {
      dispatch(authenticateAction(values))
   }


   return (
      <div className="container">
         <span className="top-text">API-консолька</span>
         <Form
         onSubmit={onSubmit}
         render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
               <div className="field-container">
                  <label>Логин</label>
                  <Field
                     name="login"
                     component="input"
                     type="text"
                  />
               </div>
               <div className="field-container">
                  <div className="sublogin-label-span">
                     <label>Сублогин</label>
                     <span className="sublogin-optional-span">Опционально</span>
                  </div>
                  <Field
                     name="sublogin"
                     component="input"
                     type="text"
                  />
               </div>
               <div className="field-container">
                  <label>Пароль</label>
                  <Field
                     name="password"
                     component="input"
                     type="password"
                  />
               </div>
               <button type="submit">
                  Submit
               </button>
            </form>
         )}
      />
      </div>
   )
}

