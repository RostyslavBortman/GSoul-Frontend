import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MainPage.css";
import axios from "axios";
import { ethers } from "ethers";
import { sbt } from "../../helpers/configure-sbt";
import { storage } from "../../helpers/configure-storage";
import { create } from "ipfs-http-client";
import { Buffer } from 'buffer';
import { provider } from "../../helpers/constants";

export default function MainPage() {
  const location = useLocation();
  const address = location.state.address;
  const domain = location.state.domain;

  const [hasToken, setHasToken] = useState();
  const [karma, setKarma] = useState('');

  useEffect(() => {

    async function getUserToken() {
      const result = await sbt.tokenOf(address);
      console.log(result.toString())
      return result.toString() === "0";
    }

    async function getUserKarma() {
      const result = await storage.getUserKarma(address);
      console.log(result.toString());
      setKarma(result.toString());
    }
    setHasToken(getUserToken());
    getUserKarma();
  }, []);
  console.log(hasToken)

  const register = async () => {
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
    const cidV1 = cid.toV1().toString();
    const validNonce = await(await sbt.nonces(address)).toString();
    const data = {to: address, nonce: validNonce, uri: cidV1 };
    const signature = await(await axios.post(`https://gsoul-app.herokuapp.com/api/kyc/generateSignature`, data)).data.signature;
    const callParams = {...data, verifier: '0xa1e1fB25268cEfB55225dbE5fD63a3b44D35E6aA'}; 
    await provider.send("eth_requestAccounts", []);
    window.alert('Creating Token');
    const signer = provider.getSigner()
    await sbt.connect(signer).mint(callParams, signature);
    window.alert('Confirming SBT');
    await storage.connect(signer).confirmSBT('0x6AF941bCa64baC55a76dD02341a29d5D85958A22');
    window.alert('Creating User');
    await storage.connect(signer).createUser();
    setHasToken(!hasToken);
  };

  if (!hasToken) {
    return (
      <div className="loginPage">
        <header className="loginPage-header">
          <div className="loginPage-wrapper">
            <p>Welcome, {domain}</p>
            <a className="loginPage-link" href="#" onClick={register}>
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
            <p>Welcome, {domain}</p>
            <p>Your karma: {karma}</p>
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
