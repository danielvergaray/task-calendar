import React, { useState, useRef, useContext } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import ButtonCreator from "../Reutilizables/ButtonCreator";
import InfoContext from "../context/InfoContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InicioSesion = () => {
  const { setCurrentUserData, botonRegresar, usersData, setSeccionActual } =
    useContext(InfoContext);

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

      toast.error("Usuario no registrado", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Header seccionActual="inicio-sesion" />
      <div className="inicioSesion-section">
        <div className="inicioSesion">
          <h1>Ingresa tu nombre de usuario</h1>
          <form onSubmit={handleIniciarSesion}>
            <input
              onChange={(e) => getUserName(e)}
              ref={inputRef}
              placeholder="Ingresa tu nombre"
              type="text"
            />
          </form>
          <div className="inicioSesion-botones">
            <div onClick={handleIniciarSesion}>
              <ButtonCreator buttonContext={textoBotonInicio} />
            </div>

            <div onClick={botonRegresar}>
              <ButtonCreator buttonContext="Regresar" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default InicioSesion;
