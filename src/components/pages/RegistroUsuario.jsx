import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InfoContext from "../context/InfoContext";

const RegistroUsuario = () => {
  const {
    createNewUser,
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
      } else {
        const newUser = {
          user: userNameTyped,
          id: crypto.randomUUID(),
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
    <div>
      <form onSubmit={handleRegistrarUsuario}>
        <input
          onChange={(e) => getNewUserName(e)}
          type="text"
          ref={inputRef}
          placeholder="Ingresa tu nombre"
        />
      </form>
      <div>
        <button onClick={handleRegistrarUsuario}>Registrar</button>
      </div>
    </div>
  );
};

export default RegistroUsuario;
