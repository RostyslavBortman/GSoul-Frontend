import { React, useState } from "react";
import "./MainPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  let navigate = useNavigate();

  const mint = async () => {};

  return (
    <div className="mainPage">
      <header className="mainPage-header">
        <div className="mainPage-wrapper">
          <a className="mainPage-link" href="#" onClick={mint}>
            mint Token
          </a>
        </div>
      </header>
    </div>
  );
}
