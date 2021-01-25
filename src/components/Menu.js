import React from 'react';
import { getAccount, removeUserSession } from '../utils/Common';

function Menu(props) {

    const account = getAccount();

    const handleLogout = () => {
        removeUserSession();
        props.history.push("/login");
    }

    return  (
        <div>
            This is the menu.<br />
            <br />
            Logged in with account: {account}<br />
            <br />
            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    );

}

export default Menu;