import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uauth } from "../../helpers/configure-ud";
import "./LoginPage.css";
import axios from "axios";

export default function LoginPage() {
  let navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [isIn, setIsIn] = useState(false);

  const connectToUD = async () => {
    const authorization = await uauth.loginWithPopup();
    setAddress(authorization.idToken.wallet_address);
    setIsIn(true);
  };

  const KYCVerification = async () => {
    try {
      const response = await axios.get(
        `https://gsoul-app.herokuapp.com/api/kyc/getUserByAddress/${address}`
      );
      console.log(response);
      navigate("/verificationSuccessful");
    } catch (error) {
      navigate("/register", {state: {address: address}});
    }
  };

  if (!isIn) {
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
  } else {
    return (
      <div className="loginPage">
        <header className="loginPage-header">
          <div className="loginPage-wrapper">
            <a className="loginPage-link" href="#" onClick={KYCVerification}>
              KYC
            </a>
          </div>
        </header>
      </div>
    );
  }
}
