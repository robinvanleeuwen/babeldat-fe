import React, { useContext } from 'react';
import { getToken, getAccount } from '../utils/Common';
import axios from 'axios';
import { Accordion , Card , Button } from 'react-bootstrap';
import { AppContext } from '../App.js';

function MenuItems(menu) {

    const {state, dispatch} = useContext(AppContext);

    const handleMenuItemClick = (dataset_id) => {
        console.log("Updating State with: "+ dataset_id);
        dispatch({ type: "UPDATE_INPUT", data: dataset_id, });
    };

    const getMenuItems = (menu_items) => {
        return menu_items.map((item) => {
            return (
                <div className="menu-item-div">
                    <Button onClick={() => handleMenuItemClick(item.dataset)} 
                    className="menu-item">
                        {item.description}
                    </Button>
                </div>
            )
        })
    };

    const renderCard = (menu) => {
        if (Array.isArray(menu)) {
            return menu.map((menu, index) => {
                    
                    return (
                        <Card>
                        <Card.Header>
                            <Accordion.Toggle 
                            as={Button} 
                            eventKey={index.toString()}>
                                {menu.description}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={index.toString()}>
                            <Card.Body>
                            { getMenuItems(menu.items) }
                            </Card.Body>
                        </Accordion.Collapse>
                        </Card>
                    )
                }
            );
        } else {
            return null;
        }
    };

    return (

        <Accordion defaultActiveKey="0">
            {renderCard(menu.menu)}
        </Accordion>

    )

}

function Menu(props) {

    const updateStateForModel = (modelname) => {
        setState({data: modelname});
    }

    let [state, setState] = React.useState({data:""}) 
    let [menu, setMenu] = React.useState("");

    React.useEffect(() => {
        const fetchMenu = async () => {
            console.log("Retrieving the menu.")
            const account = getAccount();
            const token = getToken();        
            const response = await getMenu(account, token);
            console.log("Setting the menu in State")
            setMenu(response.data.result.menu);
        };
        fetchMenu();
    }, []);

    return (
        <MenuItems menu={menu} key="mainmenu" />
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
        sessionStorage.getItem('apiUrl'), 
        data
    );
    return result;
}

export default Menu;