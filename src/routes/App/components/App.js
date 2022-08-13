import React, { useState, useRef } from "react";
import { emailLogic, nameLogic } from "../../../misc/logic";
import config from "./../../../misc/config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import "../styles/_app.scss";
function App({ setAccessPage }) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validName, setValidName] = useState(false);
  const refName = useRef(null);
  const refEmail = useRef(null);
  const onChangeEmailHandle = (e) =>
    emailLogic(e, setCurrentEmail, setValidEmail, refName);
  const onChangeNameHandle = (e) => {
    nameLogic(e, validName, setValidName, setValidEmail, refName, refEmail);
  };
  return (
    <div className={!darkMode ? "app" : "app dark-mode"}>
      <div className="level">
        <div>
          <h1 className="title">Dark Mode</h1>
        </div>

        <button
          className="app__dark-mode-btn icon level-right"
          onClick={() => setDarkMode(!darkMode)}
        >
          <FontAwesomeIcon
            icon={faMoon}
            color={!darkMode ? "black" : "white"}
          />
        </button>
      </div>

      <div className="columns">
        <div className="column">
          <p>
            Lollipop powder powder. Cotton candy caramels chupa chups halvah
            muffin caramels apple pie topping cake. Topping chocolate bar pastry
            chocolate cake. Cupcake tart jujubes dragée jelly-o icing sugar
            plum. Chocolate bar lollipop candy canes. Biscuit croissant apple
            pie pudding caramels wafer tart tootsie roll macaroon. Croissant
            tiramisu chocolate bar carrot cake lemon drops halvah.
          </p>
        </div>
        <div className="column">
          <p>
            Marshmallow tiramisu liquorice bear claw chocolate bar bear claw
            tart. Muffin chupa chups pie. Brownie apple pie topping lemon drops
            marzipan toffee. Pudding macaroon icing ice cream bonbon cake tart.
            Pudding sugar plum chocolate cake cake biscuit pastry pastry
            chocolate bar tart. Lemon drops dessert gummies icing.
          </p>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Name"
            maxLength={config.name.maxLength}
            minLength={config.name.minLength}
            ref={refName}
            onChange={onChangeNameHandle}
            onKeyDown={onChangeNameHandle}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            tabIndex="0"
            className="input"
            type="email"
            placeholder="Email"
            maxLength={config.email.maxLength}
            minLength={config.email.minLength}
            onChange={onChangeEmailHandle}
            onKeyDown={onChangeEmailHandle}
            value={currentEmail}
            ref={refEmail}
          />
        </div>
      </div>

      <section className="section">
        <div className="buttons level-right">
          <Link
            className="button is-primary"
            disabled={validEmail && validName ? false : true}
            to={validEmail && validName && `/${config.SUCESSS_PAGE_NAME}`}
            onClick={() => {
              if (validEmail && validName) {
                setAccessPage(true);
              }
            }}
          >
            Save
          </Link>
          <Link
            className="button is-link"
            to="/"
            onClick={() => {
              refName.current.value = "";
              setCurrentEmail("");
              setValidEmail(false);
            }}
          >
            Clear
          </Link>
        </div>
      </section>
    </div>
  );
}

export default App;
