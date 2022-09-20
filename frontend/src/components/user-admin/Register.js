import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LogReg.css";
import r from "../../images/register.jpg";
import axios from "axios";
import Footer from "../navigation/Footer";

const Register = () => {
  const history = useNavigate();
  const [registerInput, setRegister] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault()
    console.log(registerInput)
    axios.post('http://localhost:8000/api/register',registerInput)
        .then((res)=>{
          console.log(res.data)
          if(res.data.success){
            window.sessionStorage.setItem('auth_token',res.data.access_token);
            window.sessionStorage.setItem('user_type',res.data.user_type);
            window.sessionStorage.setItem('user_id', res.data.user_id);
            history('/home')
          }else{
            alert('Greska !')
          }
        }).catch((e)=>{
      console.log(e)
    })
  };

  return (
    <section
      className="h-100 gradient-form"
      id="logPage"
      style={{
        backgroundColor: "rgba(0,0,0,0.82)",
      }}
    >
      <div className="container py-5 h-100" id="logCon">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div
              className="card rounded-3 text-black"
              style={{ backgroundColor: "transparent", width: "800px" }}
            >
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1" id="title">
                        Kreirajte nalog
                      </h4>
                    </div>

                    <form onSubmit={handleRegister}>
                      <div className="form-outline mb-4">
                        <input
                          type=""
                          id="form2Example11"
                          className="form-control"
                          placeholder="ime"
                          onChange={handleInput}
                          name="name"
                          value={registerInput.name}
                        />
                        <span>{registerInput.error_list.name}</span>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                            type=""
                            id="form2Example111"
                            className="form-control"
                            placeholder="prezime"
                            onChange={handleInput}
                            name="lastname"
                            value={registerInput.lastname}
                        />
                        <span>{registerInput.error_list.lastname}</span>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type=""
                          id="form2Example33"
                          className="form-control"
                          placeholder="email adresa"
                          onChange={handleInput}
                          name="email"
                          value={registerInput.email}
                        />
                        <span>{registerInput.error_list.email}</span>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="sifra"
                          onChange={handleInput}
                          value={registerInput.password}
                          name="password"
                        />
                        <span>{registerInput.error_list.password}</span>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button id="btnLogin" type="submit">
                          Kreiraj nalog
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex">
                  <img
                    src={r}
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
      <Footer/>

    </section>
  );
};

export default Register;
