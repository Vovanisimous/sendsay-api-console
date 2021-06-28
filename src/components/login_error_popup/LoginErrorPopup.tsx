import React from "react";
import "./LoginErrorPopup.css"
import { ReactComponent as Meh } from "../../icons/meh.svg"

export const LoginErrorPopup = (props: {loginError: string}) => (
   <div className="error-container">
      <div className="meh">
         <Meh/>
      </div>
      <div className="error-texts">
         <span id="first-error-text">Вход не вышел</span>
         <span id="second-error-text">{props.loginError}</span>
      </div>
   </div>
)