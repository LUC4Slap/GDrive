import "./styles.css";
import React from "react";
import { FcUnlock } from "react-icons/fc";

function Login({ handlelogin }) {
  return (
    <div className="login">
      <button onClick={(e) => handlelogin(e)}>
        Logar
        <FcUnlock />
      </button>
    </div>
  );
}

export default Login;
