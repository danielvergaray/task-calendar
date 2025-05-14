import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCreator from "../Reutilizables/ButtonCreator";
import InfoContext from "../context/InfoContext";

const InicioSesion = () => {
  const { userName, setUserName /*  isNameOk, setIsNameOk */ } =
    useContext(InfoContext);

  const inputRef = useRef();

  const navigate = useNavigate();

  const textoBotonInicio = "Ingresar";

  const getUserName = (e) => setUserName(e.target.value);

  const handleEnviar = (event) => {
    event.preventDefault();
    if (userName) {
      navigate("/home");
    } else {
      inputRef.current.focus();
    }
  };

  return (
    <div className="home-inicioSesion-container">
      <form onSubmit={handleEnviar}>
        <input
          onChange={(e) => getUserName(e)}
          ref={inputRef}
          placeholder="Ingresa tu nombre"
          type="text"
        />
      </form>
      <div onClick={handleEnviar}>
        <ButtonCreator buttonContext={textoBotonInicio} />
      </div>
    </div>
  );
};

export default InicioSesion;
