import React, { useContext } from "react";
import { Link } from "react-router-dom";
import InicioSesion from "./InicioSesion";
import TasksHome from "./TasksHome";
import InfoContext from "../context/InfoContext";
import ButtonCreator from "../Reutilizables/ButtonCreator";

const Home = () => {
  const { userName, setUserName, isNameOk } = useContext(InfoContext);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Bienvenido</h1>
      <Link to="registro">
        <ButtonCreator buttonContext="Registrarse" />
      </Link>

      <Link to="inicio-sesion">
        <ButtonCreator buttonContext="Iniciar sesion" />
      </Link>

      <Link to="administrador-perfiles">
        <ButtonCreator buttonContext="Administrador" />
      </Link>
    </>
  );
};

export default Home;
/*   <>
      {!isNameOk ? (
        <div className="home-inicioSesion">
          <Link to="inicio-sesion">
          <InicioSesion />
       </Link> 
        </div>
      ) : (
         <Link to="home">
        <TasksHome />
         </Link>
      )}
    </> */
