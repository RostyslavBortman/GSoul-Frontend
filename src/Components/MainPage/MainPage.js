import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MainPage.css";
import axios from "axios";
import { ethers } from "ethers";
import { sbt } from "../../helpers/configure-sbt";
import { create } from "ipfs-http-client";
import { Buffer } from 'buffer';

export default function MainPage() {
  const location = useLocation();
  // const address = location.state.address;
  const address = "0x352438D51fc9a0A145D089a94bD93865FD3947D8";
  // const domain = location.state.domain;
  const domain = '0xd3mage.crypto';

  const [hasToken, setHasToken] = useState(async () => {});

  useEffect(() => {
    async function getUserToken() {
      const result = await sbt.tokenOf(address);
      return result.toString() === "0";
    }

    setHasToken(!getUserToken());
  }, []);


  const mintToken = async () => {
    const projectId = '2EVKZMy7X0ALOcYTmiBKKF5Pz8k'; 
    const projectSecret = '7af10aea3ce8fbd183f4240925c240e6';
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const ipfs = create({ 
      host: "ipfs.infura.io",
       port: 5001, 
       protocol: "https",
       apiPath: "/api/v0",
       headers: {
           authorization: auth,
       }, 
      });
    const metadata = {
      'title': "Soulbound",
      'name': "Karma Token",
      'description': "Owner of this token agreed to bond his soul with this token. The honor of having the token should make the owner take care of his karma.",
      'properties': {
        'owner_domain': {
          'type': 'string',
          'description': domain
        },
        'owner_address': {
          'type': 'string',
          'description': address
        },
        'created': {
          'type': 'timestamp',
          'description': Date.now()
        }
      }
    }
    const { cid } = await ipfs.add(JSON.stringify(metadata));
    const validNonce = await(await sbt.nonces(address)).toString();
    const data = {to: address, nonce: validNonce, uri: cid.toV1 };
    console.log(data);
    // const signature = await axios.post(`http://localhost:7519/api/kyc/generateSignature`, );
    // const result = await sbt.min
  };

  if (!hasToken) {
    return (
      <div className="loginPage">
        <header className="loginPage-header">
          <div className="loginPage-wrapper">
            <p>Welcome, {domain}</p>
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
