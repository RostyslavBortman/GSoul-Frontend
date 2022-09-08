import { React, useState } from "react";
import { uauth } from "./helpers/configure-ud";
import "./App.css";
import axios from "axios";

function App() {
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
    // handle success
    console.log(response);
  }).catch(function (error) {
    // handle error
    console.log(error);
  })
  };


  if (!isIn) {
    return (
      <div className="App">
          <header className='App-header'>
            <div className='Wrapper'>
              <h1 className='title'>Welcome to GSoul</h1>
                <a className='App-link' href='#' onClick={connectToUD}>
                  Connect to UD
                </a>
                <p className='text'>your identity</p>
            </div>
          </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className='App-header'>
          <div className='Wrapper'>
            {/* <p class='text'>Welcome, {domainName} </p> */}
            <a className='App-link' href='#'onClick={KYCVerification}>
                  KYC
                </a>
          </div>
        </header>
      </div>
    )
  }
}

export default App;
