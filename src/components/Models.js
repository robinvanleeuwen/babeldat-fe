import React, { useContext } from 'react';
import axios from 'axios';
import { Button, Form, Tabs, Tab } from 'react-bootstrap';
import { AppContext } from '../App.js';
import MarField from './MarField';
import { Component } from 'react';

class DatasetForm extends Component {

    constructor(props) {
        super(props);
        let primaryFields = [];
        let groupedFields = [];
        if (props.layout !== "") {
            primaryFields = props.layout.dataset_layout.primary_ui_group.map(field => {
                return field.id
            });
            
            props.layout.dataset_layout.ui_groups.map((group) => {
                group.elements.map((field) => {
                    if(field.type == "field") {
                        groupedFields.push(field.id);
                    } else if (field.type == "subgroup") {
                        field.elements.map((f) => {
                            groupedFields.push(f.id);
                        });
                    }
                    return null;
                });
                return null;
            });

            console.log(groupedFields);
        }
    }
    
    renderPrimaryUIFields = (layout) => {

        if (typeof(layout) == "object") {

            return layout.dataset_layout.primary_ui_group.map(field => {

                return <MarField field={field}></MarField>;
            });
        } else {
            return <div>Loading...</div>
        }
    }
    
    renderUIGroupFields = (fields) => {
        if (Array.isArray(fields)){
            return fields.map(
                (field) => {
                    return <MarField field={field}></MarField>;
                }
            ) 
        }    
        else {
            console.log("Could not render UIGroup fields, not an array.");
            return null;
        }
    }

    renderSubgroupTabs = (layout) => {
        if (typeof(layout) != "object"){
            return <div>Loading...</div>
        }
        let subgroups = [];
        layout.dataset_layout.ui_groups.map((group) => {
            group.elements.map((field) => {
                if(field.type === "subgroup") {
                    subgroups.push(field);
                }
                return null;
            });
            return null;
        });

        return subgroups.map((group) => {
            return (
                <Tab
                key={group.subgroup_id} 
                className="dataset-tab" 
                eventKey={group.subgroup_id} 
                title={group.caption}>
                    { this.renderUIGroupFields(group.elements) }
                </Tab>
                )
        })

    }

    renderUIGroupTabs = (layout) => {

        if (typeof(layout) != "object"){
            return <div>Loading...</div>
        }

        return layout.dataset_layout.ui_groups.map(group => {
            return (
            <Tab
            key={group.id} 
            className="dataset-tab" 
            eventKey={group.id} 
            title={group.description}>
                { this.renderUIGroupFields(group.elements) }
            </Tab>
            )
        });

    }

    render() {
        return (
            <Form onSubmit={onSubmit}>
            <h3>{ this.props.layout.dataset_description }</h3>
            <Form.Group>
                { this.renderPrimaryUIFields(this.props.layout) }
            </Form.Group>
            <hr />
            <Form.Group>
                <Tabs defaultActiveKey="generic">
                    { this.renderUIGroupTabs(this.props.layout) }
                    { this.renderSubgroupTabs(this.props.layout) }
                </Tabs>
            </Form.Group>
            <hr />
            <Button type="submit">Save</Button>
        </Form>
        );
    }
}

function onSubmit(values) {
}

function Model(props) {
    const [layout, setLayout] = React.useState("");
    const {state, } = useContext(AppContext);

    React.useEffect(() => {

        const fetchLayout = async (modelname) => {
            const response = await getModelLayout(modelname);
            setLayout(response.data.result);
        };
        if (state.modelname !== undefined && state.modelname !== "") {
            fetchLayout(state.modelname);
        } else {
            setLayout(null)
        }

    }, [state.modelname]);
    if (layout == null) {
        return null
    } else {
        return (
            <DatasetForm layout={layout}  key={`${layout.dataset_description}-form`} />
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