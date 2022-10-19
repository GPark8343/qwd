import { useState, useEffect } from "react"
import axios from 'axios'
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script'
import { useCookies } from 'react-cookie'

const Logout = function () {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const logout = function () {
        removeCookie('UserId', cookies.UserId) 
        removeCookie('Email', cookies.Email)
        removeCookie('Username', cookies.Username)
        removeCookie('AuthToken', cookies.Authtoken) 
        window.location.reload()
    }


    return (
        <div>
            <button className="standard-button" onClick={logout}>Logout</button>
        </div>
    )

}

export default Logout