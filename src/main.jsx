import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import App from "./App.jsx";
import Home from "./components/pages/Home.jsx";
import PendingTasks from "./components/pages/PendingTasks.jsx";
import InicioSesion from "./components/pages/InicioSesion.jsx";
import TasksHome from "./components/pages/TasksHome.jsx";
import TaskCreator from "./components/Reutilizables/TaskCreator.jsx";
import DaytasksRoute from "./components/pages/DaytasksRoute.jsx";
import RegistroUsuario from "./components/pages/RegistroUsuario.jsx";
import AdministradorPerfiles from "./components/pages/AdministradorPerfiles.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "registro", element: <RegistroUsuario /> },
      { path: "inicio-sesion", element: <InicioSesion /> },
      { path: "administrador-perfiles", element: <AdministradorPerfiles /> },
      {
        path: "home",
        element: <TasksHome />,
        children: [
          /* { path: "tareas-pendientes", element: <PendingTasks /> }, */
          { path: ":homeId", element: <DaytasksRoute /> },
        ],
      },
      { path: "home/task-manager", element: <TaskCreator /> },
      { path: "home/tareas-pendientes", element: <PendingTasks /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
