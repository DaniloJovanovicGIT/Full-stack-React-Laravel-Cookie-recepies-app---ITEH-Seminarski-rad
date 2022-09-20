import {Link} from "react-router-dom";
import "../../styles/Sidebar.css";
import sb from "../../images/sidebar.jpg";
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';
import {useEffect, useState} from "react";
import axios from "axios";


export default function Sidebar() {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (weatherData == null) {

            axios.get('http://api.weatherapi.com/v1/current.json?key=3dd6b82dd3274c4e9d3182627221206&q=Belgrade')
                .then((res) => {
                    console.log(res)
                    setWeatherData(res.data)
                }).catch((e) => {
            })

        }
    }, [weatherData])


    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <div className="sidebarTitle">O NAMA</div>
                <img
                    src={sb}
                    alt=""
                />
                <p>
                    Zajednica ljubitelja kafe je mesto na kome možete pronaći novosti i zanimljivosti o kafi.
                    Korisnici mogu da dele svoja iskustva i postavljaju svoje članke.
                </p>
            </div>
            <div className="sidebarItem">
                <div className="sidebarTitle">Vremenska prognoza</div>
                {weatherData == null ? <></> :
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <p>Grad: {weatherData.location.name} {weatherData.location.country}</p>
                        </li>
                        <li className="sidebarListItem">
                            <p>{weatherData.current.condition.text}<img src={weatherData.current.condition.icon} alt=''/></p>
                        </li>
                        <li className="sidebarListItem">
                            <p>Temperatura: {weatherData.current.temp_c} C</p>
                        </li>
                    </ul>
                }
            </div>

            <div className="sidebarItem">
                <div className="sidebarTitle">Pronadji recept za sebe</div>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/recipes">
                            Recepti
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="sidebarItem">
                <div className="sidebarTitle">ZAPRATITE NAS</div>
                <div className="sidebarSocial">
                    <p><FaFacebook className="fab fa-facebook-f" size={30}/></p>
                    <p><FaInstagram className="fab fa-twitter" size={30}/></p>
                    <p><FaTwitter className="fab fa-instagram" size={30}/></p>
                </div>
            </div>
        </div>
    );
}