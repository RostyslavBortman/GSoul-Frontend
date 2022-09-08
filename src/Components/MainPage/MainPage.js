import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uauth } from "../../helpers/configure-ud";
import "./MainPage.css";
import axios from "axios";
import { ethers } from 'ethers';

export default function LoginPage() {
  let navigate = useNavigate();

  const [hasToken, setHasToken] = useState(false);


  const mintToken = async () => {};
  if (!hasToken) {
    return (
      <div className="loginPage">
        <header className="loginPage-header">
          <div className="loginPage-wrapper">
            <p>Welcome, domain.name</p>
            <a className="loginPage-link" href="#" onClick={mintToken}>
              Mint your token
            </a>
          </div>
        </header>
      </div>
    );
  } else {
    return (
      <div className="loginPage">
        <header className="loginPage-header">
          <div className="loginPage-wrapper">
            {/* Domain name here */}
            <p>Welcome, domain.name</p>
            {/* karma */}
            <p>Your karma: </p>
            <form>
              <input
                className="register-input"
                type="text"
                placeholder="address to up Vote"
              />
              <button
                type="button"
                className="register-button"
                // onClick={voteUp} connect to contract function TO DO!!!
              >
                Up Vote
              </button>
            </form>
            <form>
              <input
                className="register-input"
                type="text"
                placeholder="address to down Vote"
              />
              <button
                type="button"
                className="register-button"
                // onClick={voteDown}  connect to contract function TO DO!!!
              >
                Down Vote
              </button>
            </form>
          </div>
        </header>
      </div>
    );
  }
}
