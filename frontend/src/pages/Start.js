import React from "react";
import "../styles/Start.css";
import {Link} from "react-router-dom";
import { Footer } from "react-bootstrap/lib/Modal";

function Start() {
    return (
        <div className="start-container">
            <video id="videoStart" src='/videos/pokreniUzitak.mp4' autoPlay loop muted/>
            <h1>Dobrodošli u CAKE SHOP</h1>
            <p>Mesto za sve ljubitelje torti i kolaca</p>
            <div className="start-btn">
                <Link className='btn basic large' to='/home'>Pokreni užitak!</Link>
            </div>
        </div>
       
    );
}

export default Start;