import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InfoContext from "./InfoContext";
import {
  guadarEnStorage,
  obtenerDeStorage,
  eliminarDeStorage,
} from "../../utilis/localStorage";

const InfoContextProvider = ({ children }) => {
  const [isNameOk, setIsNameOk] = useState(false);
  const [hourSelected, setHourSelected] = useState("");
  const [optionSelected, setOptionSelected] = useState("Hora");
  const [dayData, setDayData] = useState({});
  const [isHomeOff, setIsHomeOff] = useState(false);
  const [isEmergentWindowButtonDisabled, setIsEmergentWindowButtonDisabled] =
    useState(false);
  const [completedTasks, setCompletedTasks] = useState({});

  const [currentUserData, setCurrentUserData] = useState({
    user: "",
    id: Number,
    tasks: {},
    pendingTasks: [],
    savedTasks: [],
  });
  const [usersData, setUsersData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState({
    user: "",
    id: Number,
  });
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);

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
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const [seccionActual, setSeccionActual] = useState("inicio-sesion");

  const saveTask = (date, hour, task) => {
    const key = `${date}-${hour}`;

    const updatedUserTasks = {
      ...currentUserData.tasks,
      [key]: task,
    };

    const updatedUserData = {
      ...currentUserData,
      tasks: updatedUserTasks,
    };
    setCurrentUserData(updatedUserData);

    //setTasks(updatedTasks);

    setUsersData((prevUsers) =>
      prevUsers.map((user) =>
        user.id === currentUserData.id ? updatedUserData : user
      )
    );

    //guadarEnStorage("tasks", updatedTasks);

    /*  setPendingTasksArray((prev) => ({
      ...prev,
      [key]: task,
    })); */
  };

  /* Esa clave nos sirve para que se guarde la tarea del usuario en el horario escogido */

  const toggleEmergentWindow = () => {
    setIsHomeOff(!isHomeOff);
    setIsEmergentWindowButtonDisabled(!isEmergentWindowButtonDisabled);
  };

  /* Funcion que eliminar tareas  */

  const deleteTask = (singleTask) => {
    /*  const newObject = { ...tasks };
    delete newObject[singleTask];
    setTasks(newObject); */

    const newTasksObject = { ...currentUserData.tasks };
    delete newTasksObject[singleTask];

    setCurrentUserData((prev) => ({
      ...prev,
      tasks: newTasksObject,
    }));

    setUsersData((prevUsers) =>
      prevUsers.map((user) =>
        user.id === currentUserData.id
          ? { ...user, tasks: newTasksObject }
          : user
      )
    );
  };

  const toggleTaskCompletion = (key) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* const getUserName = (e) => {
    const valor = e.target.value;
    guadarEnStorage("userName", valor);
    setUserName(valor);
  }; */

  const inputRef = useRef();

  const handleEnviar = (event) => {
    /*  event.preventDefault();
    console.log(event);
    loginUser();
    if (userName) {
      navigate("/home");
      setSeccionActual("home");
    } else {
      inputRef.current.focus();
    } */

    /* Creacion de nuevos usuarios */

    const foundUser = usersData.find(
      (userObj) => userObj.user === usersData.user
    );

    if (foundUser) {
      console.log("Usuario ya existente");
    } else {
      const newUser = {
        user: usersData.user,
        tasks: {},
        pendingTasks: [],
        savedTasks: [],
      };

      setUsersData((prev) => {
        const updatedUsers = [...prev, newUser];
        //guadarEnStorage("usersData", updatedUsers);
        return updatedUsers;
      });
    }
  };

  /*  const loginUser = () => {
    const userNameGuardado = obtenerDeStorage("userName");
    setUserName(userNameGuardado);
  }; */

  const logoutUser = () => {
    //setUserName(null);
    //eliminarDeStorage("userName");

    setCurrentUserData({
      user: "",
      tasks: {},
      pendingTasks: [],
      savedTasks: [],
    });
  };

  const deleteAllTasks = () => {
    //eliminarDeStorage("tasks");
    //eliminarDeStorage("savedTasks");
    //setTasks({});
    //setSavedTasksArray([]);

    setCurrentUserData((prev) => ({
      ...prev,
      tasks: {},
      pendingTasks: [],
      savedTasks: [],
    }));

    setUsersData((allUsers) =>
      allUsers.map((eachUser) =>
        eachUser.id === selectedId
          ? { ...eachUser, tasks: {}, pendingTasks: [], savedTasks: [] }
          : eachUser
      )
    );

    setShowDeleteWindow(null);
  };

  const deleteUser = () => {
    const newUsersDataArray = usersData.filter(
      (user) => user.id !== selectedId
    );

    setUsersData(newUsersDataArray);
  };

  /* useEffect(() => {
    console.log(usersData);
  }, [usersData]);
 */
  /* Obtener tareas guardadas en el storage */

  /*  useEffect(() => {
    const storedTasks = obtenerDeStorage("tasks");
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []); */

  /*   useEffect(() => {
    console.log(currentUserData);
  }, [tasks]);
 */
  /* Creacion de usuarios */

  /* const createNewUser = (userNameTyped) => {
    const foundUser = usersData.find(
      (userObject) => userObject.user === userNameTyped
    );

    if (foundUser) {
      console.log("Usuario ya existente");
    } else {
      const newUser = {
        user: userName,
        tasks: {},
        pendingTasks: {},
        savedTasks: {},
      };
      setUsersData((prev) => {
        const updatedUsers = [...prev, newUser];
      });
      console.log(usersData.user);
    }
  }; */

  /* Boton regresar */
  const navigate = useNavigate();

  const botonRegresar = () => {
    navigate(-1);
  };

  const values = {
    botonRegresar,
    handleEnviar,
    deleteAllTasks,
    logoutUser,
    isNameOk,
    setIsNameOk,
    hours,
    saveTask,
    hourSelected,
    setHourSelected,
    optionSelected,
    setOptionSelected,
    dayData,
    setDayData,
    isHomeOff,
    setIsHomeOff,
    weekDays,
    dates,
    isEmergentWindowButtonDisabled,
    setIsEmergentWindowButtonDisabled,
    toggleEmergentWindow,
    deleteTask,
    seccionActual,
    setSeccionActual,
    completedTasks,
    setCompletedTasks,
    toggleTaskCompletion,
    usersData,
    setUsersData,
    currentUserData,
    setCurrentUserData,
    selectedId,
    setSelectedId,
    deleteUser,
    selectedUserToDelete,
    setSelectedUserToDelete,
    showDeleteWindow,
    setShowDeleteWindow,
  };

  return <InfoContext.Provider value={values}>{children}</InfoContext.Provider>;
};

export default InfoContextProvider;
