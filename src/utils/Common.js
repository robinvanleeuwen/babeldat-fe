export const setUserSession = (account, token) => {
    console.log(account+":"+token+" Is being set in sessionStorage.")
    sessionStorage.setItem('account', JSON.stringify(account).replace(/"/g, ""));
    sessionStorage.setItem('token', token);
}

export const removeUserSession = () => {
    console.log("Removing user session");
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


const apiUrl = "http://www.rldsoftware.nl:5005/api";
sessionStorage.setItem('apiUrl', apiUrl);

// const apiUrl = fetch(process.env.API_URL).then((url) => {
//     console.log("I've got: "+JSON.stringify(url));
// });