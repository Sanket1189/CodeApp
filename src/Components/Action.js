import React, { useState, useEffect } from 'react';
import './Action.css'
import { str1, str2, str3, str4, str5, str6, str7, str8, str9, str10, str11 } from './Codes.js';

export default function Action(props) {



    const [dark, setDark] = useState({
        color: props.modelevel === 'Light' ? 'white' : 'black',
        backgroundColor: props.modelevel === 'Light' ? '#091030' : 'white'
    });

    useEffect(() => {

        setDark({
            color: props.modelevel === 'Light' ? 'white' : 'black',
            backgroundColor: props.modelevel === 'Light' ? '#091030' : 'white'
        });
    }, [props.modelevel]);


    return (
        <>
            <div className="code-container" style={dark}>
                <h1>Getting Started</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str1}
                    </code></pre>
                </div>
                <h1>Execute Stored Procedure</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str2}
                    </code></pre>
                </div>
                <h1>Mysql Connection</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str3}
                    </code></pre>
                </div>
                <h1>Stored Procedure Cursor</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str4}
                    </code></pre>
                </div>
                <h1>Stored Procedure While Loop</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str5}
                    </code></pre>
                </div>
                <h1>Fetch Api Reactjs</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str6}
                    </code></pre>
                </div>
                <h1>Reactjs Infinite Scroll</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str7}
                    </code></pre>
                </div>
                <h1>Middleware for apis</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str8}
                    </code></pre>
                </div>
                <h1>React Redux</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str9}
                    </code></pre>
                </div>
                <h1>Asp.Net core Auth Controller</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str10}
                    </code></pre>
                </div>
                <h1>Asp.Net core Progran.cs For Authentication</h1>
                <div className="code-ide">
                    <pre><code className="language-csharp">
                        {str11}
                    </code></pre>
                </div>
            </div >
        </>
    )
}
