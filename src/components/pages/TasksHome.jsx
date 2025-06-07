import React, { useContext, useState } from "react";
import InfoContext from "../context/InfoContext";
import Header from "./Header";
import { guadarEnStorage, obtenerDeStorage } from "../../utilis/localStorage";
import { Button } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

const TasksHome = () => {
  const {
    userName,
    tasks,
    currentUserData,
    setDayData,
    isHomeOff,
    weekDays,
    dates,
    isEmergentWindowButtonDisabled,
    toggleEmergentWindow,
    setSeccionActual,
  } = useContext(InfoContext);

  /* const [completedTasks, setCompletedTasks] = useState({}); */
  const navigate = useNavigate();

  const handleButton = (indexDate, date) => {
    const dayData = { indexDate, date };
    //setDayData({ indexDate, date });
    setDayData(dayData);
    //guadarEnStorage("dayData", dayData);
    setSeccionActual("");
  };

  /*  const deleteTask = (singleTask) => {
    const newObject = { ...tasks };
    delete newObject[singleTask];
    setTasks(newObject);
  }; */

  /* const toggleTaskCompletion = (key) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }; */

  const horaAValor = (hora) => {
    const match = hora.match(/^(\d+)(am|pm|m)$/);
    if (!match) return 0;

    let [_, num, sufijo] = match;
    num = parseInt(num);

    if (sufijo === "am") return num === 12 ? 0 : num;
    if (sufijo === "m") return 12; // mediodía
    if (sufijo === "pm") return num === 12 ? 12 : num + 12;
  };

  /*  const toggleEmergentWindow = () => {
    setIsHomeOff(!isHomeOff);
    setIsEmergentWindowButtonDisabled(!isEmergentWindowButtonDisabled);
  }; */
  const userTasks = currentUserData.tasks || {};

  return (
    <>
      {/* <div>Hola {userName}</div> */}
      <Header seccionActual="home" />
      <div className=" taskHome-section">
        <div className="taskHome-weekdays">
          {weekDays.map((weekday, index) => (
            <div className="taskHome-weekdays-item" key={index}>
              <p>{weekday}</p>
            </div>
          ))}
        </div>

        <div className=" taskHome-calendar-container">
          {dates.map((date, indexDate) => {
            const tareasDelDia = Object.entries(userTasks)
              .filter(([key, _]) => key.startsWith(`${date}-`)) // Solo tareas del día actual
              .sort((a, b) => {
                const [, hourA] = a[0].split("-");
                const [, hourB] = b[0].split("-");
                return horaAValor(hourA) - horaAValor(hourB);
              });

            const tareasMostradas = tareasDelDia.slice(0, 1);
            const hayMasTareas = tareasDelDia.length > 1;

            return (
              <div className="taskHome-calendar-item" key={date}>
                <div className="taskHome-calendar-item-date">
                  <p>{date}</p>
                </div>

                <div className="taskHome-calendar-item-tasks">
                  {tareasMostradas.map(([key, value]) => {
                    const [, hour] = key.split("-"); // Extrae la hora de la clave
                    return (
                      <p key={key}>
                        <strong>{hour}:</strong> {value}
                      </p>
                    );
                  })}

                  {hayMasTareas && (
                    <div>
                      <Link to={`${date}`}>
                        <button
                          disabled={isEmergentWindowButtonDisabled}
                          onClick={toggleEmergentWindow}
                        >
                          Ver más
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* {!isEmergentWindowButtonDisabled && ( */}
                <div className="taskHome-container-btn">
                  <Link to="task-manager">
                    <button
                      disabled={isEmergentWindowButtonDisabled}
                      onClick={() => handleButton(indexDate, date)}
                    >
                      add
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TasksHome;
