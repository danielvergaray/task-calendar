import React from "react";
import { useNavigate } from "react-router-dom";

const PendingTasks = () => {
  const navigate = useNavigate();
  return (
    <div className="tareas-pendientes">
      <button onClick={() => navigate(-1)}>Cerrar</button>
      <h2>PendingTasks</h2>
    </div>
  );
};

export default PendingTasks;
