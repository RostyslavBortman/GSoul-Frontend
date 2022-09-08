import UAuth from '@uauth/js'

export const uauth = new UAuth({
    clientID: "d412aa56-0f96-4012-9c9d-aea918fc888f",
    redirectUri: "https://gsoul-app.herokuapp.com/",
    scope: "openid wallet"
}); 
