import { React, useState } from "react";
import "./RegisterPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    
  let navigate = useNavigate();
    
    let getData = async () =>{
       
        let userAddress = document.getElementById("userAddress").value;
        let username = document.getElementById("username").value;
        let userlastname = document.getElementById("userlastname").value;
        let userbirthday = document.getElementById("userbirthday").value;
        let useremail = document.getElementById("useremail").value;
        let usersex = document.getElementById("usersex").value;

        let bodyFormData = new FormData();
        bodyFormData.set('address',userAddress);
        bodyFormData.set('name', username);
        bodyFormData.set('lastName',userlastname);
        bodyFormData.set('birthday',userbirthday);
        bodyFormData.set('email', useremail);
        bodyFormData.set('sex', usersex);
        bodyFormData.set('KYC',true);

        axios({
            method: 'post',
            url: 'https://gsoul-app.herokuapp.com/api/kyc/addUser',
            data: bodyFormData
            })
            .then(function (response) {
                navigate("/verificationSuccessful")
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
            navigate("/verificationSuccessful");
    }
    

  const [isIn, setIsIn] = useState(true);

    const Isregistred = async () => {
        axios.get('https://gsoul-app.herokuapp.com/api/kyc/getUserByAddress/0x3A0060f7e429e6a8c217B8229d232E8Da506aa5434dd')
        .then(function (response) {
          if(response.data.kyc == false){
            setIsIn(false)
          }   
     }).catch(function (error) {

      console.log(error);
    })
    };
    Isregistred();
      return (
        <div className="loginPage">
          <header className='loginPage-header'>
            <div className='loginPage-wrapper'>
                <form>
                    <input className="register-input" id="userAddress" type="text" placeholder="address" required />
                    <input className="register-input" id="username" type="text" placeholder="name" />
                    <input className="register-input" id="userlastname" type="text" placeholder="lastname" />
                    <input className="register-input" id="userbirthday" type="text" placeholder="birthday" />
                    <input className="register-input" id="useremail" type="email" placeholder="email" />
                    <input className="register-input" id="usersex" type="text" placeholder="sex" />
                    <button type='button' onClick={getData}>get NFT</button> 

                </form>
            </div>
          </header>
      </div>
      );
    }    
    