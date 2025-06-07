import React, { useContext, useEffect } from "react";
import InfoContext from "../context/InfoContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdministradorPerfiles = () => {
  const { usersData } = useContext(InfoContext);
  const navigate = useNavigate();
  const verRegistros = () => {
    console.log(usersData);
  };

  return (
    <div>
      <div onClick={() => navigate(-1)}>
        <Button>Regresar</Button>
      </div>
      <div onClick={verRegistros}>
        <button>Ver registros</button>
      </div>
      {Object.entries(usersData).length > 0 ? (
        <div>
          <p>Usuarios registrados:</p>
          <div>
            {Object.entries(usersData).map((userData) => {
              <>
                <h2>{userData.user}</h2>
                {userData.map((userIndividualData) => {
                  <div>
                    <h2>Actividades</h2>
                    <div>
                      <p>{userIndividualData.tasks}</p>
                    </div>
                  </div>;
                })}
              </>;
            })}
          </div>
        </div>
      ) : (
        <p>No hay usuarios registrados</p>
      )}
    </div>
  );
};

export default AdministradorPerfiles;
