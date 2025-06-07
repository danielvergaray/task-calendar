import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfoContext from "../context/InfoContext";
import ButtonCreator from "./ButtonCreator";
import DropdownCreator from "./DropdownCreator";
import { guadarEnStorage, obtenerDeStorage } from "../../utilis/localStorage";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuArrowUp } from "react-icons/lu";
import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";

const TaskCreator = () => {
  const {
    saveTask,
    tasks,
    hourSelected,
    savedTasksArray,
    setSavedTasksArray,
    setOptionSelected,
    setHourSelected,
    dayData,
    hours,
    deleteTask,
    toggleTaskCompletion,
    completedTasks,
    setDayData,
    currentUserData,
    setCurrentUserData,
    /* setIsEmergentWindowButtonDisabled,
    isEmergentWindowButtonDisabled, */
  } = useContext(InfoContext);
  const [taskTyped, setTaskTyped] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputRef = useRef();

  const navigate = useNavigate();

  const addTaskFunction = (event) => {
    event.preventDefault();
    if (taskTyped && hourSelected) {
      saveTask(dayData.date, hourSelected, taskTyped);
      setTaskTyped(""); // limpiar input
      setOptionSelected("Hora");
      setHourSelected("");
      //setPendingTasksArray();

      let busqueda = savedTasksArray.includes(taskTyped);

      if (!busqueda) {
        //setSavedTasksArray((prev) => [...prev, taskTyped]);
        const updatedSavedTasks = [
          ...(currentUserData.savedTasks || []),
          taskTyped,
        ];
        //setSavedTasksArray(updatedSavedTasks);

        setCurrentUserData((prev) => ({
          ...prev,
          savedTasks: updatedSavedTasks,
        }));

        //guadarEnStorage("savedTasks", updatedSavedTasks);
      } else {
        //setSavedTasksArray((prev) => [...prev]);
        const updatedSavedTasks = [...currentUserData.savedTasks];

        //setSavedTasksArray(updatedSavedTasks);
        setCurrentUserData((prev) => ({
          ...prev,
          savedTasks: updatedSavedTasks,
        }));
        //guadarEnStorage("savedTasks", updatedSavedTasks);
      }
    } else {
      inputRef.current.focus();
    }
  };

  /*  useEffect(() => {
    const storedTasks = obtenerDeStorage("savedTasks");
    if (storedTasks) {
      setSavedTasksArray(storedTasks);
    }
  }, []); */

  const deleteSavedTask = (taskToDelete) => {
    const newArray = currentUserData.savedTasks.filter(
      (task) => task !== taskToDelete
    );
    //setSavedTasksArray(newArray);
    setCurrentUserData((prev) => ({
      ...prev,
      savedTasks: newArray,
    }));
  };
  const pickedTask = (task) => {
    setTaskTyped(task);
    setHourSelected("");
  };

  const handleUserInput = (e) => {
    const taskTypedWord = e.target.value;
    const adaptedWord = taskTypedWord.toLocaleLowerCase();
    setTaskTyped(adaptedWord);
  };

  const handleCloseBottom = () => {
    navigate(-1);
    //setIsEmergentWindowButtonDisabled(!isEmergentWindowButtonDisabled);
  };

  const verBoton = () => {
    console.log(dayData);
    console.log(tasks);
  };

  /* const deleteTask = (singleTask) => {
    const newObject = { ...tasks };
    delete newObject[singleTask];
    setTasks(newObject);
  };
 */
  useEffect(() => {
    if (taskTyped && hourSelected) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [taskTyped, hourSelected]);

  /* useEffect(() => {
    const storedDate = obtenerDeStorage("dayData");
    if (storedDate) {
      setDayData(storedDate);
    }
  }, []); */

  const userTasks = currentUserData.tasks || {};
  const userSavedTasks = currentUserData.savedTasks || [];

  return (
    <div className="taskCreator-container">
      <div className="taskCreator-manager">
        <button onClick={() => handleCloseBottom()}>Atrás</button>
        <div className="taskCreator-title">
          <h1>Task Manager</h1>
          <p>Editando el dia {dayData.date}</p>
        </div>
        <form onSubmit={addTaskFunction}>
          <input
            ref={inputRef}
            value={taskTyped}
            onChange={(e) => handleUserInput(e)}
            placeholder="Add a new task"
            type="text"
          />
          <div className="taskCreator-hourList">
            <DropdownCreator props={hours} />
          </div>

          <div onClick={(event) => addTaskFunction(event)}>
            <ButtonCreator
              buttonContext="Add task"
              isButtonDisabled={isButtonDisabled}
            />
          </div>
        </form>

        <div className="taskCreator-savedTasks-container">
          <h4>Tareas guardadas</h4>
          {userSavedTasks && userSavedTasks.length > 0 ? (
            <div className="taskCreator-savedTasks-activities">
              {userSavedTasks.map((task, index) => (
                <div className="savedTasks-icons" key={index}>
                  <p>{task}</p>
                  <div onClick={() => pickedTask(task)}>
                    <LuArrowUp />
                  </div>
                  <div onClick={() => deleteSavedTask(task)}>
                    <RiDeleteBinLine />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay actividades guardadas</p>
          )}
        </div>
      </div>

      <div className="taskCreator-daySection">
        <h2>{dayData.date}</h2>

        <div className="taskCreator-daySection-days">
          {hours.map((hour, index) => (
            <div key={index} className="taskCreator-daySection-activity">
              <p>{hour}</p>
              <p>{userTasks[`${dayData.date}-${hour}`]}</p>
              {userTasks[`${dayData.date}-${hour}`] ? (
                <div className="taskCreator-daySection-activity-icons">
                  <div onClick={() => deleteTask(`${dayData.date}-${hour}`)}>
                    <RiDeleteBinLine />
                  </div>
                  <div>
                    {completedTasks[`${dayData.date}-${hour}`] ? (
                      <FaRegCheckSquare
                        onClick={() =>
                          toggleTaskCompletion([`${dayData.date}-${hour}`])
                        }
                      />
                    ) : (
                      <FaRegSquare
                        onClick={() =>
                          toggleTaskCompletion([`${dayData.date}-${hour}`])
                        }
                      />
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCreator;
