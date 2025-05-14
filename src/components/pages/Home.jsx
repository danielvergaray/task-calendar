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
      <ButtonCreator buttonContext="Registrarse" />
      <Link to="inicio-sesion">
        <ButtonCreator buttonContext="Iniciar sesion" />
      </Link>
      {/*  {!isNameOk ? (
        <div className="home-inicioSesion">
    
          <InicioSesion />
       
        </div>
      ) : (
       
        <TasksHome />
    
      )} */}
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
