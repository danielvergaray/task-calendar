import React, { useContext } from "react";
import InfoContext from "../context/InfoContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdministradorPerfiles = () => {
  const { usersData } = useContext(InfoContext);
  const navigate = useNavigate();

  const verRegistros = () => {
    console.log(usersData);
  };

  return (
    <div>
      <div onClick={() => navigate(-1)}>
        <Button>Regresar</Button>
      </div>

      <div onClick={verRegistros}>
        <button>Ver registros</button>
      </div>

      {Object.keys(usersData).length > 0 ? (
        <div>
          <h2>Usuarios registrados:</h2>
          <div>
            {Object.entries(usersData).map(([userId, userData]) => (
              <div key={userId}>
                <h3>Usuario: {userData.user}</h3>

                <div>
                  <h4>Tareas guardadas:</h4>
                  <ul>
                    {userData.savedTasks.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Tareas programadas:</h4>
                  <ul>
                    {userData.tasks ? (
                      Object.entries(userData.tasks).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      ))
                    ) : (
                      <p>No hay tareas</p>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No hay usuarios registrados</p>
      )}
    </div>
  );
};

export default AdministradorPerfiles;
