import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import InfoContext from "../context/InfoContext";
import { Button } from "react-bootstrap";

const Header = ({ seccionActual }) => {
  const {
    userName,
    logoutUser,
    deleteAllTasks,
    toggleEmergentWindow,
    isHomeOff,
    currentUserData,
  } = useContext(InfoContext);

  return (
    <div className="header-container">
      {seccionActual === "inicio-sesion" ? (
        <div>Iniciar sesion</div>
      ) : seccionActual === "home" ? (
        <div className="header-home">
          <div className="header-home-user">
            <p>Hola {currentUserData.user}</p>
          </div>

          <div className="header-home-botones">
            <div className="header-pendingTasks">
              <Link to="tareas-pendientes">
                <Button onClick={toggleEmergentWindow}>
                  Ir a tareas pendientes
                </Button>
              </Link>
            </div>
            <Outlet />

            <div className="header-cerrarSesion">
              <Link to="/">
                <Button onClick={() => logoutUser()}>Cerrar sesion</Button>
              </Link>
            </div>

            <div className="header-eliminar-todo">
              <Button onClick={() => deleteAllTasks()}>Eliminar todo</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
