import React from 'react';
import './index.css'

function Mask(props) {
    return (
        <div className="mask" onClick={props.onClickMask}></div>
    );
}

export default Mask;