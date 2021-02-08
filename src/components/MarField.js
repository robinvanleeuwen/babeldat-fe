import { Form } from 'react-bootstrap';

function MarField(props) {

    let disabled;

    try {
        disabled = props.field.permissions.includes("w")? false: true;
    }
    catch(err) {
        return null;
    }
    

    if (props.field.htmltype === "text" ||
        props.field.htmltype === "numeric" ||
        props.field.htmltype === "date") {
            return (
                <div>
                    <Form.Label 
                    htmlFor={props.field.id}
                    className="my-1" 
                    >
                        {props.field.description}
                    </Form.Label>
                    <Form.Control
                        key={props.field.id}
                        disabled={disabled}
                        className="my-1 mr-sm-2" 
                        type={props.field.htmltype}
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