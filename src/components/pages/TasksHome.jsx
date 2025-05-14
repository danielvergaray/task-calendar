import React, { useContext, useEffect, useState } from "react";
import InfoContext from "../context/InfoContext";
import ButtonCreator from "../Reutilizables/ButtonCreator";
import TaskCreator from "../Reutilizables/TaskCreator";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { Link, Outlet, useNavigate } from "react-router-dom";

const TasksHome = () => {
  const {
    userName,
    hours,
    tasks,
    setTasks,
    dayData,
    setDayData,
    isHomeOff,
    setIsHomeOff,
    weekDays,
  } = useContext(InfoContext);
  //const [isTaskCreatorOpened, setIsTaskOpened] = useState(false);
  //const [dayData, setDayData] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});

  /* const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ]; */

  const navigate = useNavigate();

  const handleButton = (indexDay, day) => {
    //setIsTaskOpened(!isTaskCreatorOpened);
    setDayData({ indexDay, day });
    setIsHomeOff(!isHomeOff);
  };
  /* Elimina actividades del cuadro */
  /* Es diferente a un array porque es un objeto */

  const deleteTask = (singleTask) => {
    const newObject = { ...tasks };
    delete newObject[singleTask];
    setTasks(newObject);
  };

  const toggleTaskCompletion = (key) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key], // cambia de true a false o viceversa
    }));
  };

  return (
    <>
      <div>Hola {userName}</div>

      <div className="taskHome-container">
        <div className="taskHome-container-calendar">
          {weekDays.map((day, indexDay) => (
            <div className="taskHome-container-day">
              <h2>{day}</h2>
              <div className="taskHome-container-day-hours">
                {hours.map((hour) => (
                  <div className="taskHome-day-activity-container">
                    <p>{hour}</p>
                    <div className="taskHome-day-activity">
                      <p>{tasks[`${day}-${hour}`]}</p>{" "}
                      {/* Con esto busco la clave dia-hora dentro del objeto tasks y meuestro la que coincida */}
                      {tasks[`${day}-${hour}`] && (
                        <div className="taskHome-day-activity-icons">
                          {completedTasks[`${day}-${hour}`] ? (
                            <FaRegCheckSquare
                              onClick={() =>
                                toggleTaskCompletion(`${day}-${hour}`)
                              }
                            />
                          ) : (
                            <FaRegSquare
                              onClick={() =>
                                toggleTaskCompletion(`${day}-${hour}`)
                              }
                            />
                          )}
                          <AiOutlineEdit />
                          <RiDeleteBinLine
                            onClick={() => deleteTask(`${day}-${hour}`)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div
                onClick={() => handleButton(indexDay, day)}
                className="taskHome-container-btn"
              >
                <Link to="task-manager">
                  <ButtonCreator buttonContext="Agregar tarea" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={isHomeOff ? "home-apagado" : ""}>
        <Link to="tareas-pendientes">
          <button>Ir a tareas pendientes</button>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default TasksHome;
