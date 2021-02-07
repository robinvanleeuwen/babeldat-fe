import { Form } from 'react-bootstrap';

function MarField(props) {

    let disabled;


    // if ("subgroup_id" in props.field) {
    //     console.debug("We have a subgroup");
    //     return null;
    // }

    try {
        disabled = props.field.permissions.includes("w")? false: true;
    }
    catch(err) {
        console.debug("Error found in:" );
        console.debug(props.field);
        return null;
    }
    

    if(props.field.htmltype === "text" || props.field.htmltype === "numeric"){
            return (
                <div>
                    <Form.Label 
                    htmlFor={props.field.id}
                    className="my-1" 
                    >
                        {props.field.description}
                    </Form.Label>
                    <Form.Control 
                        disabled={disabled}
                        className="my-1 mr-sm-2" 
                        type="text"
                        id={props.field.id} />
                </div>
            );
    }
    if(props.field.htmltype === "checkbox"){     

            return (
                <div>
                    <Form.Check
                        disabled={disabled}
                        label={props.field.description}
                        type="checkbox" 
                        id={props.field.id}
                        className="mb-3" 
                        key={props.field.id} />
                </div>
            );
    }

    

    return null
}

export default MarField;