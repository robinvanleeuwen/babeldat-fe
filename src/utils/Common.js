import axios from "axios";

export const setUserSession = (account, token) => {
    sessionStorage.setItem('account', JSON.stringify(account).replace(/\"/g, ""));
    sessionStorage.setItem('token', token);
}

export const removeUserSession = () => {
    sessionStorage.removeItem('account');
    sessionStorage.removeItem('token');
}

export const getAccount = () => {
    const account = sessionStorage.getItem("account");
    console.log("account = " + account);
    return account;   
}

export const getToken = () => {
    return sessionStorage.getItem("token") || null;
}

const apiUrl = "http://127.0.0.1:5005/api";
export const doRequest = async (data) => {
    const response = await axios.post(apiUrl, data).then((response) => {
        return response;
    });
}