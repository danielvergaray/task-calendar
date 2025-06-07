import React, { useState, useRef, useContext } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import ButtonCreator from "../Reutilizables/ButtonCreator";
import InfoContext from "../context/InfoContext";

const InicioSesion = () => {
  const {
    setCurrentUserData,
    setUserName,
    usersData,
    setUsersData,
    setSeccionActual,
    /*     getUserName, */
    loginUser,
    /*  handleEnviar, */
  } = useContext(InfoContext);

  const [nameTyped, setNameTyped] = useState("");

  const inputRef = useRef();

  const navigate = useNavigate();

  const textoBotonInicio = "Ingresar";

  const getUserName = (e) => {
    const nameTyped2 = e.target.value;
    //guadarEnStorage("userName", valor);
    setNameTyped(nameTyped2);
  };

  //const getUserName = (e) => setUserName(e.target.value);

  const handleIniciarSesion = (event) => {
    event.preventDefault();

    /* Verificacion usuario */
    const foundUser = usersData.find(
      (userObject) => userObject.user === nameTyped
    );

    if (foundUser) {
      const userData = {
        user: foundUser.user,
        tasks: foundUser.tasks,
        pendingTasks: foundUser.pendingTasks,
        savedTasks: foundUser.savedTasks,
      };
      setCurrentUserData(userData);

      navigate("/home");
      setSeccionActual("home");
    } else {
      console.log("Usuario NO existente");

      //setUsersData((prev) => [...prev, userData]);
    }

    /* if (userName) {
      navigate("/home");
      setSeccionActual("home");
    } else {
      inputRef.current.focus();
    } */
  };

  return (
    <>
      <Header seccionActual="inicio-sesion" />
      <div className="home-inicioSesion-container">
        <form onSubmit={handleIniciarSesion}>
          <input
            onChange={(e) => getUserName(e)}
            ref={inputRef}
            placeholder="Ingresa tu nombre"
            type="text"
          />
        </form>
        <div onClick={handleIniciarSesion}>
          <ButtonCreator buttonContext={textoBotonInicio} />
        </div>
      </div>
    </>
  );
};

export default InicioSesion;
