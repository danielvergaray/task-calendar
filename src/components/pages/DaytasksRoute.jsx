import React, { useContext, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import InfoContext from "../context/InfoContext";
import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "react-bootstrap";

const DaytasksRoute = () => {
  const { homeId } = useParams();
  const { hours, toggleEmergentWindow, deleteTask, currentUserData } =
    useContext(InfoContext);
  const navigate = useNavigate();

  const userTasks = currentUserData.tasks || {};

  return (
    <div className="daytasks-container">
      {/* <button onClick={() => navigate(-1)}>Cerrar</button> */}
      <Link to="/home">
        <Button onClick={toggleEmergentWindow}> Cerrar</Button>
      </Link>
      <h1>{homeId}</h1>
      <div className="daytasks-hours">
        {hours.map((hour) => (
          <div className="taskCreator-hours-activity">
            <p>{hour}</p>
            <p>{userTasks[`${homeId}-${hour}`]}</p>
            <div className="taskCreator-daySection-activity-icons">
              <div onClick={() => deleteTask(`${homeId}-${hour}`)}>
                <RiDeleteBinLine />
              </div>
              <div>
                <FaRegSquare />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaytasksRoute;
