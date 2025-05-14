import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfoContext from "../context/InfoContext";
import ButtonCreator from "./ButtonCreator";
import DropdownCreator from "./DropdownCreator";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuArrowUp } from "react-icons/lu";

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
    setIsHomeOff,
    isHomeOff,
  } = useContext(InfoContext);
  const [taskTyped, setTaskTyped] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputRef = useRef();

  const navigate = useNavigate();

  const addTaskFunction = (event) => {
    event.preventDefault();
    if (taskTyped && hourSelected) {
      saveTask(dayData.day, hourSelected, taskTyped);
      setTaskTyped(""); // limpiar input
      setOptionSelected("Hora");
      setHourSelected("");

      let busqueda = savedTasksArray.includes(taskTyped);
      if (!busqueda) {
        setSavedTasksArray((prev) => [...prev, taskTyped]);
      } else {
        setSavedTasksArray((prev) => [...prev]);
      }
    } else {
      inputRef.current.focus();
    }
  };
  const deleteSavedTask = (taskToDelete) => {
    const newArray = savedTasksArray.filter((task) => task !== taskToDelete);
    setSavedTasksArray(newArray);
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
    setIsHomeOff(!isHomeOff);
  };

  const verBoton = () => {
    console.log(dayData);
    console.log(tasks);
  };

  useEffect(() => {
    if (taskTyped && hourSelected) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [taskTyped, hourSelected]);

  return (
    <div className="taskCreator-container">
      <div className="taskCreator-manager">
        <button onClick={() => handleCloseBottom()}>Atrás</button>
        <div className="taskCreator-title">
          <h1>Task Manager</h1>
          <p>Editando el dia {dayData.day}</p>
        </div>
        <form onSubmit={addTaskFunction}>
          <input
            ref={inputRef}
            value={taskTyped}
            onChange={(e) => handleUserInput(e)}
            placeholder="Add a new task"
            type="text"
          />
          <div onClick={(event) => addTaskFunction(event)}>
            <ButtonCreator
              buttonContext="Add task"
              isButtonDisabled={isButtonDisabled}
            />
          </div>
        </form>

        <div className="taskCreator-hourList">
          <DropdownCreator props={hours} />
        </div>

        <div className="taskCreator-savedTasks-container">
          <h4>Tareas guardadas</h4>
          <div className="taskCreator-savedTasks-activities">
            {savedTasksArray.map((task, index) => (
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
        </div>
      </div>

      <div className="taskCreator-daySection">
        <h2>{dayData.day}</h2>

        <div className="taskCreator-daySection-days">
          {hours.map((hour) => (
            <div className="taskCreator-daySection-activity">
              <p>{hour}</p>
              <p>{tasks[`${dayData.day}-${hour}`]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCreator;
