import { React, useState } from "react";
import "./RegisterPage.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state.address;
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState(""); 
  const [sex, setSex] = useState("");

  let signUp = async () => {
    const data = {
      address, name, lastName, birthday, email, sex 
    }
    // try {
    //   const response = await axios.post("https://gsoul-app.herokuapp.com/api/kyc/addUser", data);
    //   navigate("/mainPage");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="loginPage">
      <h2 className="title">KYC is not granted. Please, sign up</h2>
      <header className="loginPage-header">
        <div className="loginPage-wrapper">
          <form>
            <input
              className="register-input"
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="register-input"
              type="text"
              placeholder="lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="register-input"
              type="text"
              placeholder="birthday"
              onChange={(e) => setBirthday(e.target.value)}
            />
            <input
              className="register-input"
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="register-input"
              type="text"
              placeholder="sex"
              onChange={(e) => setSex(e.target.value)}
            />
            <button type="button" onClick={signUp}>
                Sign Up
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}
