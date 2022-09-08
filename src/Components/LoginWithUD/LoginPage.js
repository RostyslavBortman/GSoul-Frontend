import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uauth } from "../../helpers/configure-ud";
import "./LoginPage.css";
import axios from "axios";


export default function LoginPage() {

  let navigate = useNavigate();

  const [domainName, setDomainName] = useState('');
  const [address, setAddress] = useState('');
  const [isIn, setIsIn] = useState(false);

  const connectToUD = async () => {
    const authorization = await uauth.loginWithPopup();
    setDomainName(authorization.idToken.sub);
    setAddress(authorization.idToken.wallet_address)
    setIsIn(true);
  };

  const KYCVerification = async () => {
    axios.get('https://gsoul-app.herokuapp.com/api/kyc/getUserByAddress/0x3A0060f7e429e6a8c217B8229d232E8Da506aa5434dd')
      .then(function (response) {
      response.data.kyc?  navigate("/verificationSuccessful") :navigate("/register");
  }).catch(function (error) {
    // handle error
    console.log(error);
  })
  };

  if (!isIn) {
    return (
      <div className="loginPage">
        <header className='loginPage-header'>
          <div className='loginPage-wrapper'>
            <h1 className='title'>Welcome to GSoul</h1>
              <a className='loginPage-link' href='#' onClick={connectToUD}>
                Connect to UD
              </a>
              <p className='loginPage-text'>your identity</p>
          </div>
        </header>
    </div>
    );
  }
  else {
    return (
      <div className="loginPage">
        <header className='loginPage-header'>
          <div className='loginPage-wrapper'>
            {/* <p class='text'>Welcome, {domainName} </p> */}
            <a className='loginPage-link' href='#'onClick={KYCVerification}>
                  KYC
                </a>
          </div>
        </header>
      </div>
    )
  }
    
  }