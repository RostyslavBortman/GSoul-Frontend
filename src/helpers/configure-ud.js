import UAuth from '@uauth/js'

export const uauth = new UAuth({
    clientID: "d412aa56-0f96-4012-9c9d-aea918fc888f",
    redirectUri: "http://localhost:3000",
    scope: "openid wallet"
}); 
