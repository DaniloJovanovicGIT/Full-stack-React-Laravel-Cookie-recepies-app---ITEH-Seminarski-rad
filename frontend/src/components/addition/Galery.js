import "../../styles/Galery.css";
import React from "react";
import p1 from "../../images/c1.jpg";

function Galery() {

    return (
        <div id="slider">
            <img id="img" src={p1} alt=""/>
        </div>
    );
}

export default Galery;
