import React from "react";
import "../../styles/Faq.css";

const Faq = () => {
  return (
    <div className="faq-section">
      <div id="header">
        <h1>Najčešće postavljena pitanja </h1>
      </div>
      <div className="containerFAQ">
        <div className="accordion">
          <div className="accordion-item" id="q1">
            <a className="accordion-link" href="#q1">
              Da li se torte mogu poruciti kod Vas?
            </a>
            <div className="answer">
              <p> Ne, mi delimo informacije i recepte, dok pravljenje torte vrsite Vi.</p>
            </div>
          </div>
          <div className="accordion-item" id="q2">
            <a className="accordion-link" href="#q2">
              Da li postoje veganske torte?
              <i className="icon ion-md-add"/>
              <i className="icon ion-md-remove"/>
            </a>
            <div className="answer">
              <p>
                Da, postoje. Mozete naci recepte za iste na pocetnoj strani u odeljku "pronadji recept"
              </p>
            </div>
          </div>
          <div className="accordion-item" id="q3">
            <a className="accordion-link" href="#q3">
              Koja je vasa misija?
              <i className="icon ion-md-add"/>
              <i className="icon ion-md-remove"/>
            </a>
            <div className="answer">
              <p>
                {" "}
                Nasa misija je ujedinjenje svih ljubitelja pravljenja kolaca i torti na jednom mestu, i omogucavanje razmene misljenja i recepata.
                </p>
            </div>
          </div>
          <div className="accordion-item" id="q4">
            <a className="accordion-link" href="#q4">
              Da li ste ikad razmisljali da krenete u teretanu umesto pravljenja CAKE SHOP bloga.
              <i className="icon ion-md-add"/>
              <i className="icon ion-md-remove"/>
            </a>
            <div className="answer">
              <p>
                Da ali smo bili gladni pri pravljenju seminarskog rada{" "}
              </p>
            </div>
          </div>
          <div className="accordion-item" id="q5">
            <a className="accordion-link" href="#q5">
              Da li je bolje kupiti tortu ili je napraviti je kod kuce?
              <i className="icon ion-md-add"/>
              <i className="icon ion-md-remove"/>
            </a>
            <div className="answer">
              <p>
                U toku procesa pravljenja torte Vi kupujete sve namernice i sve sami sa svojih 10 prstiju, tako da je najbolje da prenesete svoju ljubav u tortu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
