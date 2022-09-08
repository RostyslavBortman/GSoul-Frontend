import { React } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./Components/LoginWithUD/LoginPage";
import MintPage from "./Components/MintPage/MintPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";


function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="verificationSuccessful" element={<MintPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
