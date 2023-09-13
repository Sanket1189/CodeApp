import React, { useState, useEffect } from 'react'
import './Card.css';


export default function Card(props) {
    const [dark, setDark] = useState({
        boxShadow: props.modelevel === 'Light' ? '10px 5px 5px rgb(3, 3, 5)' : '10px 5px 5px rgb(116, 104, 104)',
        border: props.modelevel === 'Light' ? '2px solid black' : '2px solid white'
    });

    useEffect(() => {

        setDark({
            boxShadow: props.modelevel === 'Light' ? '10px 5px 5px rgb(3, 3, 5)' : '10px 5px 5px rgb(116, 104, 104)',
            border: props.modelevel === 'Light' ? '2px solid white' : '2px solid black'
        });
    }, [props.modelevel]);
    return (

        <>


            <div className="card inner-card" style={dark}>



                <img src={props.eleimg || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"} className="card-img-top carimg" alt="Dog" />
                <div className="card-body">
                    <h5 className="card-title">{props.elebreed ? props.elebreed : ""}</h5>
                    <p className="card-text">{props.eleori ? props.eleori : ""}</p>

                </div>



            </div>



        </>




    )
}
