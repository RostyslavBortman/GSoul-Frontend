import { React } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./Components/LoginWithUD/LoginPage";
import MainPage from "./Components/MainPage/MainPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";


function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registerPage/:address/:domain/:accessToken" element={<RegisterPage />} />
          <Route path="/mainPage/:address/:domain/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
