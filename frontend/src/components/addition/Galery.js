import "../../styles/Galery.css";
import React from "react";
import p1 from "../../images/c1.jpg";
// import p2 from "../../images/c2.jpg";
// import p3 from "../../images/c3.jpg";
// import p4 from "../../images/c4.jpg";

function Galery() {
    // var picPaths = [p1, p2, p3, p4];
    // var curPic = -1;
    // //preload the images for smooth animation
    // var imgO = new Array();
    // for (var i = 0; i < picPaths.length; i++) {
    //     imgO[i] = new Image();
    //     imgO[i].src = picPaths[i];
    // }
    // var imgCont;
    //
    // function swapImage() {
    //     curPic = ++curPic > picPaths.length - 1 ? 0 : curPic;
    //     imgCont.src = imgO[curPic].src;
    //     setTimeout(swapImage, 30000);
    // }
    //
    // window.onload = function () {
    //     imgCont = document.getElementById("img");
    //     swapImage()
    // };

    return (
        <div id="slider">
            <img id="img" src={p1} alt=""/>
        </div>
    );
}

export default Galery;
