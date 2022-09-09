import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uauth } from "../../helpers/configure-ud";
import "./LoginPage.css";

export default function LoginPage() {
  let navigate = useNavigate();

  const connectToUD = async () => {
    const authorization = await uauth.loginWithPopup();
    navigate("/registerPage", {
      state: {
        address: authorization.idToken.wallet_address,
        accessToken: authorization.accessToken,
        domain: authorization.idToken.sub,
      },
    });
  };

  return (
    <div className="loginPage">
      <header className="loginPage-header">
        <div className="loginPage-wrapper">
          <h1 className="title">Welcome to GSoul</h1>
          <a className="loginPage-link" href="#" onClick={connectToUD}>
            Connect to UD
          </a>
          <p className="loginPage-text">your identity</p>
        </div>
      </header>
    </div>
  );
}
