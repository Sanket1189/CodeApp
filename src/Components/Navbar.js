import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Navbar.css';
import { Link } from 'react-router-dom';



export default function Navbar(props) {
    const [mode, setMode] = useState("Light");

    let [styleColor, setStyleColor] = useState({
        color: '#040412',
        backgroundColor: 'white'

    });


    const switchChange = () => {
        if (styleColor.color === "white") {
            setStyleColor({
                color: '#040412',
                backgroundColor: 'white'
            });
            setMode("Light");

        } else {
            setStyleColor({
                color: 'white',
                backgroundColor: '#040412'
            });
            setMode("Dark");
        }
        props.sendDataToParent(mode);
    }




    return (
        <>
            <nav className="navbar  navbar-expand-lg  " style={styleColor}>
                <div className="container-fluid">
                    <a className="navbar-brand" style={styleColor} href="/">{props.title}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link className="nav-link active" style={styleColor} aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" style={styleColor} href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Explore
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/code">Code</Link></li>
                                    <li><Link className="dropdown-item" to="/dogs">Dog Site</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/">Something else here</a></li>
                                </ul>
                            </li>
                            <div className="form-check form-switch switch ">
                                <input className="form-check-input switch-sym" onChange={switchChange} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{mode}</label>
                            </div>
                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

Navbar.prototype = {
    title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
    title: "Brand Name"
};
