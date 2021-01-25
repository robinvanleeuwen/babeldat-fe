export const setUserSession = (account, token) => {
    sessionStorage.setItem('account', JSON.stringify(account));
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
