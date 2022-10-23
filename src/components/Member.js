import { useState, useEffect } from "react"
import axios from 'axios'
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script'
import { useCookies } from 'react-cookie'

const Member = function ({ID}) {
    
    const membership = async function () {
        const response = await axios.put(`http://localhost:8000/member`, { ID: ID})
        
        window.location.reload()
    }


  
    return (
        <div>
            <button className="standard-button" onClick={membership}>Be a Member</button>
        </div>
    )

}

export default Member