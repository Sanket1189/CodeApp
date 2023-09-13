import React, { useState, useEffect } from 'react';
import './Spinner.css';

export default function Spinner(props) {
    const [dark, setDark] = useState({
        background: props.modelevel === 'Light' ? 'white' : 'black'


    });

    useEffect(() => {
        setDark({
            background: props.modelevel === 'Light' ? 'white' : 'black'
        });
    }, [props.modelevel]);
    return (
        <div className="lds-ellipsis" ><div style={dark}></div><div style={dark}></div><div style={dark}></div><div style={dark}></div></div>
    )
}
