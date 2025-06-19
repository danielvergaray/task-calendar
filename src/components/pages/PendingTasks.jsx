import React, { useContext, useState } from "react";
import InfoContext from "../context/InfoContext";
import { Button } from "react-bootstrap";

const PendingTasks = () => {
  const { tasks, toggleEmergentWindow, currentUserData, botonRegresar } =
    useContext(InfoContext);

  const tareasAgrupadasPorDia = {};
  const userTasks = currentUserData.tasks || {};

  Object.entries(userTasks).forEach(([key, value]) => {
    const [fecha, hora] = key.split("-");
    if (!tareasAgrupadasPorDia[fecha]) {
      tareasAgrupadasPorDia[fecha] = [];
    }
    tareasAgrupadasPorDia[fecha].push({ hora, tarea: value });
  });

  return (
    <div className="tareas-pendientes-container">
      <div className="tareas-pendientes-cerrar">
        <Button
          onClick={() => {
            botonRegresar();
            toggleEmergentWindow();
          }}
        >
          Cerrar
        </Button>
      </div>

      <h2>Tareas pendientes</h2>

      {Object.keys(userTasks).length > 0 && Object.keys(userTasks) ? (
        <div className="tareas-pendientes">
          {Object.entries(tareasAgrupadasPorDia).map(([fecha, tareas]) => (
            <div key={fecha} className="tareas-pendientes-dia">
              <p>{fecha}</p>
              {tareas.map(({ hora, tarea }, index) => (
                <div key={index} className="tareas-pendientes-dia-actividad">
                  <p>{hora}</p>
                  <span>-</span>
                  <p> {tarea}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="tareas-pendientes-vacio">
          <p>No hay tareas pendientes</p>
          <Button
            onClick={() => {
              botonRegresar();
              toggleEmergentWindow();
            }}
          >
            Empieza a agregar tareas
          </Button>
        </div>
      )}
    </div>
  );
};

export default PendingTasks;
