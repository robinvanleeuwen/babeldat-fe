import React from 'react';
import { getAccount, removeUserSession, getToken } from '../utils/Common';
import axios from 'axios';




function Menu(props) {

    const account = getAccount();
    const token = getToken();

    const handleLogout = () => {
        removeUserSession();
        props.history.push("/login");
    }

    getMenu(account, token).then( res => {
        console.log(res);
        const menu = res.data.result;
        for (const key in menu) {
            console.log(key);
        }
        console.log(menu);
    
    });

    return  (
           <div class="row">
               <div class="column-small" align="left">
               <div class="container">
                <nav class="menu">
                    <ul>
                        <input type="radio" name="menu" id="archive" checked />
                        <li>
                            <label for="archive" class="title"><i class="fa fa-folder"></i>Master Data Maintenance</label>
                            <a href="/model/sites">Sites</a>
                            <a href="#">Warehouse</a>
                            <a href="#">Countries</a>
                            <a href="#">Employees</a>
                            <a href="#">Clients</a>
                            <a href="#">Carriers</a>
                        </li>
                        <input type="radio" name="menu" id="edit" />
                        <li>
                            <label for="edit" class="title"><i class="fa fa-edit"></i>Warehouse</label>
                            <a href="#">Warehouselocations</a>
                            <a href="#">SKU</a>
                        </li>
                        <input type="radio" name="menu" id="tools" />
                        <li>
                            <label for="tools" class="title"><i class="fa fa-gavel"></i>Transport</label>
                            <a href="#">Vehicles</a>
                            <a href="#">Vehicle Types</a>
                        </li>
                        <input type="radio" name="menu" id="preferences" />
                        <li>
                            <label for="preferences" class="title"><i class="fa fa-gears"></i>Preferences</label>
                            <a href="#">Browser</a>
                            <a href="#">Settings</a>
                            <a href="#">Packages</a>
                            <a href="#">Theme</a>
                        </li>
                    </ul>
                </nav>
                   
               </div>

            </div>
           </div>
           
    );

} 

const getMenu = async (account, token) => {

    let data = {
        "jsonrpc": "2.0",
        "id": "12345",
        "method": "menu.get_menu",
        "params": {
            "account": account,
            "token": token,
            "api_developer_key": "1",
            "menu_item": "1",
            "recursive": true
        }
    }
    
    const result = axios.post(
        "http://127.0.0.1:5005/api", 
        data
    );
    return result;
}
export default Menu;