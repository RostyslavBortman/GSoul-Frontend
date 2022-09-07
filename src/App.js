import { Button, Paper, Typography } from "@mui/material";
import { React, useState } from "react";
import { uauth } from "./helpers/configure-ud";
import "./App.css";

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

  if (!isIn) {
    return (
      <div className="App">
        <Paper id="button_paper">
          <Button id="ud_button" variant="contained" onClick={connectToUD}>
            Connect to UD
          </Button>
        </Paper>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Paper id="kyc_paper">
          <Typography variant="h2">Welcome, {domainName} </Typography>
        </Paper>
      </div>
    )
  }
}

export default App;
