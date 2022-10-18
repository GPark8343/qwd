import { useState,useEffect } from "react"
import axios from 'axios'
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script'
import { useCookies } from 'react-cookie'

const Auth = function(){
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    useEffect(() => {
        function start() {
        gapi.client.init({
        clientId:"842315934937-6vjvb4mbl7srluq60n148v1kdpnori1f.apps.googleusercontent.com",
        scope: 'email',
          });
           }
          gapi.load('client:auth2', start);
           }, []);



    const handleLogin = async function(googleData){
console.log(googleData)
const email = googleData.wt.cu
const ggToken = googleData.tokenObj.id_token
const name = googleData.wt.Ad
const response = await axios.post(`http://localhost:8000/signup`, {
    ggToken, email, name
        })

        setCookie('UserId', response.data.userId) // uuid
        setCookie('Email', response.data.mail)
        setCookie('Username', response.data.name)
        setCookie('AuthToken', response.data.token) // uuid를 스트림 토큰으로 바꾼 거
     
        window.location.reload()
    }

return(
    <div>
<GoogleLogin
            clientId="842315934937-6vjvb4mbl7srluq60n148v1kdpnori1f.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
    </div>
)

}

export default Auth