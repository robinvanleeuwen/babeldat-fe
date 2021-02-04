import React from 'react';
import Menu from './Menu';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Button, Form, Tabs, Tab } from 'react-bootstrap';

function DatasetForm({layout}) {

    const renderUIGroupFields = (fields) => {
        if (Array.isArray(fields)){
            return fields.map((field) => {
                return (
                    <div key={field.id}>
                        <Form.Label className="my-1 mr-2 form-label" key={`${field.id}-description`} htmlFor={field.id}>{field.description}</Form.Label>
                        <Form.Control className="my-1 mr-sm-2" key={field.id} type="text" id={field.id}></Form.Control>
                    </div>
                );
            });
        } else {
            return null;
        }
    }

    const renderUIGroupTabs = (layout) => {

        if (typeof(layout) == "object"){

            return layout.dataset_layout.ui_groups.map(group => {
                return (
                <Tab className="dataset-tab" eventKey={group.id} title={group.description}>
                    { renderUIGroupFields(group.elements) }
                </Tab>
                )
            })

        } else {
            return <div>Loading...</div>
        }
    }

    const renderPrimaryUIFields = (layout) => {

        if (typeof(layout) == "object") {

            return layout.dataset_layout.primary_ui_group.map(field => {
               return (
                    <div key={field.id}>
                        <Form.Label className="my-1 mr-2 form-label" key={`${field.id}-description`} htmlFor={field.id}>{field.description}</Form.Label>
                        <Form.Control className="my-1 mr-sm-2" key={field.id} type="text" id={field.id}></Form.Control>
                    </div>
               );
            })
        } else {
            return <div>Loading...</div>
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <h3>{layout.dataset_description}</h3>
            <Form.Group>
                { renderPrimaryUIFields(layout) }
            </Form.Group>
            <hr />
            <Form.Group>
                <Tabs defaultActiveKey="generic">
                    { renderUIGroupTabs(layout) }
                </Tabs>
            </Form.Group>
            <hr />
            <Button type="submit">Save</Button>
        </Form>
    );
}

function onSubmit(values) {
    console.log(values);
}

function Model(props) {
    const [layout, setLayout] = React.useState("");

    React.useEffect(() => {

        const fetchLayout = async (modelname) => {
            const response = await getModelLayout(modelname);
            setLayout(response.data.result);
        };
        if (props.modelname != undefined) {
            fetchLayout(props.modelname);
        } else {
            setLayout(null)
        }

    }, []);
    if (layout == null) {
        return null
    } else {
        return (
            <DatasetForm layout={layout} />
        )
    }
}

const getModelLayout = async (modelname) => {

    const apiUrl = sessionStorage.getItem("apiUrl");
    const account = sessionStorage.getItem("account");
    const token = sessionStorage.getItem("token");
    
    const data = {
        "jsonrpc": "2.0",
        "id": "12345",
        "method": "stdui.layout",
        "params": {
            "account": account,
            "token": token,
            "api_developer_key": "1",
            "dataset_id": modelname
        }
    }

    const response = axios.post(apiUrl, data);
    return response;
} 

export default Model;