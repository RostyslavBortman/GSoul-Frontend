import { React, useEffect, useState } from "react";
import "./RegisterPage.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [address, setAddress] = useState(location.state.address);
  const [domain, setDomain] = useState(location.state.domain);
  const [accessToken, setAccessToken] = useState(location.state.accessToken);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");

  useEffect(() => {
    const KYCVerification = async () => {
      try {
        const response = await axios.get(
          `https://gsoul-app.herokuapp.com/api/kyc/getUserByAddress/${address}`
        );
        navigate("/mainPage", { state: { address: address, domain: domain } });
      } catch (error) {
      }
    };

    KYCVerification();
  }, []);

  const signUp = async () => {
    const data = {
      address,
      name,
      lastName,
      birthday,
      email,
      sex,
    };
    try {
      await axios.post(
        "https://gsoul-app.herokuapp.com/api/kyc/addUser",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate("/mainPage", { state: { address: address, domain: domain } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginPage">
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
