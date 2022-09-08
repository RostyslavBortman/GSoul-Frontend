import { React, useState } from "react";
import "./MintPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const ethers = require('ethers');
// const Web3 = require("web3");

export default function LoginPage() {
  // const provider = new ethers.providers.AlchemyProvider('goerli', process.env.API_KEY)
  // const privateKey = process.env.PRIVATE_KEY
  // const signer = new ethers.Wallet(privateKey, provider)
  // const contractAddress = '';  // TO DO!!!

  // let contract_ABI = ; // TO DO !!!

  // const contract = new ethers.Contract(contractAddress, contract_ABI, signer);


  const [isIn, setIsIn] = useState(true);
  let navigate = useNavigate();

    const mint = async () =>{
      // await contract.mint() // TO DO !!!
    }
    const registred = async () => {
        axios.get('https://gsoul-app.herokuapp.com/api/kyc/getUserByAddress/0x3A0060f7e429e6a8c217B8229d232E8Da506aa5434dd')
        .then(function (response) {
          if(response.data.kyc == false){
            setIsIn(false)
          }   
     }).catch(function (error) {

      console.log(error);
    })
    };
    registred()

    if (isIn) {
      return (
        <div className="mintPage">
          <header className='mintPage-header'>
            <div className='mintPage-wrapper'>
                <a className='mintPage-link' href='#' onClick={mint}>
                  mint Token
                </a>
            </div>
          </header>
      </div>
      );
    }else {
      return (
        <div className="mintPage">
          <header className='mintPage-header'>
            <div className='mintPage-wrapper'>
              {/* <p class='text'>Welcome, {domainName} </p> */}
             <a className='mintPage-link-err' href="#" onClick={navigate("/")}>You need to pass KYC</a>
            </div>
          </header>
        </div>
      )
    }
      
    }