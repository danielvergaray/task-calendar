import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InfoContext from "../context/InfoContext";
import { Button } from "react-bootstrap";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistroUsuario = () => {
  const {
    botonRegresar,
    usersData,
    setUsersData,
    setSeccionActual,
    setCurrentUserData,
  } = useContext(InfoContext);
  const [userNameTyped, setUserNameTyped] = useState("");

  const navigate = useNavigate();
  const inputRef = useRef();

  const getNewUserName = (e) => {
    const nameTyped = e.target.value;
    setUserNameTyped(nameTyped);
  };

  const generarId = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleRegistrarUsuario = (event) => {
    event.preventDefault();

    /* Verificacion que userName cumpla */

    if (userNameTyped.length > 3) {
      const foundUser = usersData.find(
        (userObject) => userObject.user === userNameTyped
      );

      /*  Busqueda de usuario existente */
      if (foundUser) {
        console.log("Usuario ya existente");

        toast.error("Usuario ya existente", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        const newUser = {
          user: userNameTyped,
          id: generarId(),
          tasks: {},
          pendingTasks: [],
          savedTasks: [],
        };

        setUsersData((prev) => [...prev, newUser]);
        setCurrentUserData(newUser);
        navigate("/home");
        setSeccionActual("home");
      }
    } else {
      console.log("ingrese minimo 4 letras");
      inputRef.current.focus();
    }
  };

  /*   useEffect(() => {
    console.log(usersData);
  }, [usersData]);
 */
  return (
    <>
      <Header seccionActual="registro" />
      <div className="inicioSesion-section">
        <div className="inicioSesion">
          <h1>¿Como quieres que te llamemos?</h1>
          <form onSubmit={handleRegistrarUsuario}>
            <input
              onChange={(e) => getNewUserName(e)}
              type="text"
              ref={inputRef}
              placeholder="Ingresa tu nombre"
            />
          </form>
          <div className="inicioSesion-botones">
            <div>
              <Button onClick={handleRegistrarUsuario}>Registrar</Button>
            </div>
            <div>
              <Button onClick={botonRegresar}>Regresar</Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegistroUsuario;
