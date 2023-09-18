import React, { useState } from 'react'
import './Slider.css'

export default function Slider() {
    const [switchm, setSwitchm] = useState(false);

    const [mode, setMode] = useState({
        borderRadius: "100%",
        animation: "sank 3s linear infinite normal",
        animationPlayState: "paused"

    })
    const display = () => {
        if (switchm === false) {
            setMode((prevMode) => {

                return { ...prevMode, animationPlayState: "running" };
            });
            setSwitchm(true);
        } else {
            setMode((prevMode) => {

                return { ...prevMode, animationPlayState: "paused" };
            });
            setSwitchm(false);
        }
    };
    const [msg, setMsg] = useState(0);
    const clicked = () => {
        setMsg((prev) => prev + 1)
    }
    return (
        <>
            <img onClick={display} style={mode} className="a" src="https://source.unsplash.com/200x200/?background" alt="gg" />
            <div>{msg}</div>
            <button onClick={clicked}>submit</button>

        </>
    )
}
