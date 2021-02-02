import React from 'react';
import Menu from './Menu'
import { useParams } from "react-router-dom";

function Model(props) {

    const { modelname } = useParams();

    return (
        <div>
        <Menu /> 
        <form>
            <div>{modelname}</div>
        </form>
        </div>
    )
}

export default Model;