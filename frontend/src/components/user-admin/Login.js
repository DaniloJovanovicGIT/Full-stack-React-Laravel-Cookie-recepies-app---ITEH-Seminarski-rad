import React from "react";
import {useState} from "react";
import "../../styles/LogReg.css";
import l from "../../images/login.jpg";
import axios from "axios";
import {Link} from "react-router-dom";
import alert from "react-bootstrap/lib/Alert";
import Footer from "../navigation/Footer";

const Login = () => {

    const [loginInput, setLogin] = useState({
        email: "",
        password: "",
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({
            ...loginInput,
            [e.target.name]: e.target.value,
        });


    };

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(loginInput)
        axios.post('http://localhost:8000/api/login', loginInput)
            .then((res) => {
                console.log(res.data)
                if (res.data.success) {
                    console.log(res.data)
                    window.sessionStorage.setItem('auth_token', res.data.access_token);
                    window.sessionStorage.setItem('user_type', res.data.user_type[0].role_slug);
                    window.sessionStorage.setItem('user_id', res.data.user_id);
                    window.location.href = '/home'
                }
            }).catch((e) => {
                window.alert('Problem sa prijavom')
            console.log(e)
        })
    };

    return (
        <>
            <section
                className="h-100 gradient-form"
                id="logPage"
                style={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                }}
            >
                <div className="container py-5 h-100" id="logCon">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div
                                className="card rounded-3 text-black"
                                style={{backgroundColor: "transparent", width: "800px"}}
                            >
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <h4 className="mt-1 mb-5 pb-1 " id="title">
                                                    Dobrodosli u CAKE SHOP Blog!
                                                </h4>
                                            </div>

                                            <form onSubmit={handleLogin}>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Unesite email adresu"
                                                        onChange={handleInput}
                                                        value={loginInput.email}
                                                        name="email"
                                                    />
                                                    <span>{loginInput.error_list.email}</span>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Unesite sifru"
                                                        onChange={handleInput}
                                                        value={loginInput.password}
                                                        name="password"
                                                    />
                                                    <span>{loginInput.error_list.password}</span>
                                                </div>

                                                <div className="loginBtn">
                                                    <button id="btnLogin" type="submit">
                                                        Prijavi se
                                                    </button>
                                                </div>

                                                <div className="loginToRegister">
                                                    <Link to="/register">
                                                        <p
                                                            className="mb-0 me-2"
                                                            style={{color: "white", textDecoration: "none"}}
                                                        >
                                                            Ne posedujem nalog.
                                                        </p>
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex">
                                        <img
                                            src={l}
                                            alt=""
                                            style={{
                                                width: "700px",
                                                height: "530px",
                                                margin: "10px",
                                                borderRadius: "1em",
                                            }}
                                        />
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>

        </>
    );
};
export default Login;
