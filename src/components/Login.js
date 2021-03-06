import React,  { useState } from 'react';
import '../css/animate.css';
import '../css/style.css';
import axios from 'axios';
import { setUserSession, removeUserSession } from '../utils/Common.js';
import { uuid } from 'uuidv4';

function Login(props) { 
    const account = useFormInput('');
    const password = useFormInput('');
    const [, setError] = useState(null);
    const [, setLoading] = useState(false);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        removeUserSession();

        let data = {
            "jsonrpc": "2.0",
            "id": uuid(),
            "method": "auth.login",
            "params": {
                "account": account.value,
                "code": account.value,
                "password": password.value,
                "api_developer_key": "1",
                "device_code": "1",
                "timezone": "Europe/Amsterdam"
            }
        }
        const apiUrl = sessionStorage.getItem("apiUrl");

        axios.post(apiUrl, data).then(response => {
            setLoading(false);
            console.log("Setting the usersession with token and account.")
            setUserSession(
                response.data.result.token.account,
                response.data.result.token.code,
            );
            window.location.reload();
            
        }).catch(error =>{
            console.log("Cought Error in Login: "+ error);
            removeUserSession();
            setLoading(false);    
        });

    };

    const checkKey = (e) => {
        if (e.key === "Enter"){
            handleLogin();
        }
    }

    return (

        <div className="login-box animated fadeInUp">
            <div className="box-header">
                <h2>Samarra Login</h2>
            </div>
            <label htmlFor="account">Account</label>
            <input type="text" {...account } onKeyDown={checkKey} />
            <br/>
            <label htmlFor="password">Password</label>
            <input type="password" {...password } onKeyDown={checkKey} />
            <br/>
            <button type="button" value="Sign In"  onClick={() => handleLogin()}>Log In</button>
            <br/>
            <p className="small">Forgot your password?</p>
        </div>
    );

}

const useFormInput = initialValue => {

    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value, 
        onChange: handleChange
    }
}

export default Login;