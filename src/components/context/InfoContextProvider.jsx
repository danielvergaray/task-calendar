import React, { useState } from "react";
import InfoContext from "./InfoContext";

const InfoContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [isNameOk, setIsNameOk] = useState(false);
  const [tasks, setTasks] = useState({});
  const [hourSelected, setHourSelected] = useState("");
  const [savedTasksArray, setSavedTasksArray] = useState([]);
  const [optionSelected, setOptionSelected] = useState("Hora");
  const [dayData, setDayData] = useState({});
  const [isHomeOff, setIsHomeOff] = useState(false);

  const hours = [
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12m",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
    "12pm",
  ];

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const saveTask = (day, hour, task) => {
    const key = `${day}-${hour}`;
    setTasks((prev) => ({
      ...prev,
      [key]: task /* Guarda una clave que relaciona la tarea con el horario */,
    }));
  };

  /* Esa clave nos sirve para que se guarde la tarea del usuario en el horario escogido */

  const values = {
    userName,
    setUserName,
    isNameOk,
    setIsNameOk,
    hours,
    setTasks,
    saveTask,
    tasks,
    hourSelected,
    setHourSelected,
    savedTasksArray,
    setSavedTasksArray,
    optionSelected,
    setOptionSelected,
    dayData,
    setDayData,
    isHomeOff,
    setIsHomeOff,
    weekDays,
  };

  return <InfoContext.Provider value={values}>{children}</InfoContext.Provider>;
};

export default InfoContextProvider;
