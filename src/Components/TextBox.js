import React, { useState, useEffect } from 'react';
import './TextBox.css';


export default function TextBox(props) {
    const [text, setText] = useState("");
    const onHandleChange = (event) => {
        setText(event.target.value);
    }
    const toUppercaseFunction = () => {
        setText(text.toUpperCase());
    }
    const toLowercaseFunction = () => {
        setText(text.toLowerCase());
    }
    const toRemoveWhiteSpaceFunction = () => {
        setText(text.replaceAll(" ", ""));
    }
    const clear = () => {
        setText("");
    }


    const [dark, setDark] = useState({
        color: props.modelevel === 'Light' ? 'white' : 'black',
        backgroundColor: props.modelevel === 'Light' ? '#091030' : 'white'
    });
    const [box, setBox] = useState({
        color: props.modelevel === 'Light' ? 'white' : 'black',
        backgroundColor: props.modelevel === 'Light' ? '#091030' : 'white'
    });

    useEffect(() => {
        setBox({
            color: props.modelevel === 'Light' ? 'white' : 'black',
            backgroundColor: props.modelevel === 'Light' ? '#091030' : 'white'
        });
        setDark({
            color: props.modelevel === 'Light' ? 'white' : 'black',
            backgroundColor: props.modelevel === 'Light' ? '#091030' : 'white'
        });
    }, [props.modelevel]);


    return (
        <>
            <div className="textouter" style={dark}>

                <div>
                    <h1>ENTER TEXT TO PLAY WITH</h1>
                </div>
                <div className="mb-3 text-box">
                    <p>Length : {text.length}</p>

                    <textarea className="form-control text-input" placeholder='Enter Text' value={text} onChange={onHandleChange} id="exampleFormControlTextarea1" rows="10" style={box}></textarea>

                    <button disabled={text.length === 0} type="button" className="btn btn-primary mt-4 working-btn" onClick={toUppercaseFunction}>Convert To Uppercase </button>
                    <button disabled={text.length === 0} type="button" className="btn btn-primary mt-4 working-btn" onClick={toLowercaseFunction}>Convert To Lowercase </button>
                    <button disabled={text.length === 0} type="button" className="btn btn-primary mt-4 working-btn" onClick={toRemoveWhiteSpaceFunction}>Remove White Space</button>
                    <button disabled={text.length === 0} type="button" className="btn btn-primary mt-4 working-btn" onClick={clear}>Clear</button>

                </div>
            </div>
        </>
    )
}
