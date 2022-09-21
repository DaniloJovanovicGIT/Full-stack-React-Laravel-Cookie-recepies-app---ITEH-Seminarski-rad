import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../../styles/Footer.css";
import { useState } from "react";
import {Link} from "react-router-dom";

const emailList = [];
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    let value = { email };
    emailList.push(value);
    console.log(emailList);
  };

  return (
    <footer className="footer">
      <div className="containerFooter">
        <div className="rowFooter">
          <div className="footer-col">
            <h4>CAKE SHOP Blog</h4>
            <ul>
              <li>
                <Link to="/home">pocetna</Link>
              </li>
              <li>
                <Link to="/faq">često postavljena pitanja</Link>
              </li>
              <li>
                <Link to="/contact">kontakt</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>personalizacija</h4>
            <ul>
              <li>
                <Link to="/register">napravi nalog</Link>
              </li>
              <li>
                <Link to="/login">uloguj se</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>zapratite nas</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/">
                <FaFacebook className="fab fa-facebook-f" size={40} />
              </a>
              <a href="https://twitter.com/">
                <FaInstagram className="fab fa-twitter" size={40} />
              </a>
              <a href="https://www.instagram.com/">
                <FaTwitter className="fab fa-instagram" size={40} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
