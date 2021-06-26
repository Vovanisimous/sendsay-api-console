import React from "react";
import { Form, Field } from 'react-final-form'
import { useDispatch } from "react-redux";
import {authenticateAction} from "../redux/sagas/auth"

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
      <Form
         onSubmit={onSubmit}
         render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
               <div>
                  <label>Логин</label>
                  <Field
                     name="login"
                     component="input"
                     type="text"
                  />
               </div>
               <div>
                  <label>Саблогин</label>
                  <Field
                     name="sublogin"
                     component="input"
                     type="text"
                  />
               </div>
               <div>
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
   )
}

