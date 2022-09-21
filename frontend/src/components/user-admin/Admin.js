import "../../styles/Admin.css";
import {GiCoffeeBeans} from "react-icons/gi";
import {AiOutlineSearch} from "react-icons/ai";
import {FaRegComments} from "react-icons/fa";
import {FiUsers, FiUser} from "react-icons/fi";
import {MdOutlineArticle} from "react-icons/md";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Grafik from "./Grafik";
import Footer from "../navigation/Footer";

const Admin = () => {

    if (window.sessionStorage.getItem('user_type') !== 'admin' &&
        window.sessionStorage.getItem('user_type') !== 'post_manager') {

        window.location.href = '/';
    }

    const [statistics, setStatistics] = useState(null);
    const [chartData, setChartData] = useState({});
    useEffect(() => {
        if (statistics == null) {
            axios.get('http://localhost:8000/api/get-admin-statistics', {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
                    'Content_Type': 'application/json',
                },
            })
                .then((res) => {
                    console.log(res)
                    console.log(res.data)
                    if (res.data.success) {
                        setStatistics(res.data.statistics)
                        setChartData(res.data.chart_data[0])
                    } else {
                        window.alert('Cant get statistics!')
                    }
                }).catch((e) => {
            })
        }
    })

    function downloadReport(){
        axios.get('http://localhost:8000/api/get-report', {
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
                'Content-Type': 'application/json'
            },
            responseType:'blob'
        })
            .then((res) => {
                console.log(res)
                console.log(res.data)
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Izvestaj.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();

            }).catch((e) => {
        })
    }

    return (
        <>

            <div className="container-Admin">
                <div className="navigation">
                    <ul>
                        <li>
                            <Link to="/home">
                <span className="icon">
                  {" "}
                    <GiCoffeeBeans size={20}/>
                </span>
                                <span className="title">Blog</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cakes">
                <span className="icon">
                  <GiCoffeeBeans size={20}/>
                </span>
                                <span className="title">Torte</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users">
                <span className="icon">
                  <FiUsers size={20}/>
                </span>
                                <span className="title">Korisnici</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts">
                <span className="icon">
                  <MdOutlineArticle size={20}/>
                </span>
                                <span className="title">Postovi</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories">
                <span className="icon">
                  <FaRegComments size={20}/>
                </span>
                                <span className="title">Kategorije</span>
                            </Link>
                        </li>

                    </ul>
                </div>

                <div className="main">
                    <div className="topbar">
                        
                        <div className='stampajBtn'>
                            <button id="downloadStats" onClick={downloadReport}>Download izvestaja</button>
                        </div>
                    </div>

                    <div className="cardbox">
                        <div className="card">
                            <div>
                                <div className="numbers">{statistics != null ? statistics.posts : 0}</div>
                                <div className="cardName">Broj postova</div>
                            </div>
                            <div className="iconBx">
                                <MdOutlineArticle size={30}/>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <div className="numbers">{statistics != null ? statistics.comments : 0}</div>
                                <div className="cardName">Broj komentara</div>
                            </div>
                            <div className="iconBx">
                                <FaRegComments size={30}/>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <div className="numbers">{statistics != null ? statistics.users : 0}</div>
                                <div className="cardName">Broj korisnika</div>
                            </div>
                            <div className="iconBx">
                                <FiUsers size={30}/>
                            </div>
                        </div>
                    </div>

                    <div className="details">
                        <div className="recentPosts">

                            <Grafik chartData={chartData}/>
                            <h3> Broj objavljenih postova na dnevnom nivou</h3>
                        </div>
                        <div className="recentCustumers">
                            <table>
                                <tbody>
                                <tr>
                                    <td width="60px">
                                        <div className="imgBx">
                                            <FiUser size={30}/>{" "}
                                        </div>
                                    </td>
                                    <td>
                                        <h4>
                                            Broj ulogovanih korisnika
                                            <br/>
                                            <span>{statistics != null ? statistics.active_users : 0}</span>
                                        </h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>

        </>
    );
};
export default Admin;
