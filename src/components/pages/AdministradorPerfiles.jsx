import React, { useContext, useState } from "react";
import InfoContext from "../context/InfoContext";
import { Button } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const AdministradorPerfiles = () => {
  const {
    usersData,
    botonRegresar,
    deleteAllTasks,
    deleteUser,
    setSelectedId,
    setSelectedUserToDelete,
    selectedUserToDelete,
    showDeleteWindow,
    setShowDeleteWindow,
  } = useContext(InfoContext);
  const [hoveredUserId, setHoveredUserId] = useState(null);

  const verRegistros = () => {
    console.log(usersData);
  };

  const handleButton = (userData) => {
    setShowDeleteWindow(true);
    setSelectedId(userData.id);
    setSelectedUserToDelete({
      user: userData.user,
      id: userData.id,
    });
  };
  const handleCloseButton = () => {
    setShowDeleteWindow(false);
    setSelectedId(null);
    setHoveredUserId(null);
  };

  const saveHoveredId = (id) => {
    setHoveredUserId(id);
  };

  return (
    <div className="administrador-section">
      {!showDeleteWindow && (
        <div className="administrador-btn" onClick={botonRegresar}>
          <Button>Regresar</Button>
        </div>
      )}

      {/*    <div onClick={verRegistros}>
        <button>Ver registros</button>
      </div> */}

      {usersData.length > 0 ? (
        <div className="administrador-container">
          {!showDeleteWindow && (
            <>
              <h2>Usuarios registrados:</h2>
              <div className="administrador-usuarios">
                {usersData.map((eachUser) => (
                  <div key={eachUser.id}>
                    {hoveredUserId === eachUser.id ? (
                      <div
                        className="administrador-user-hovered"
                        onClick={() => handleButton(eachUser)}
                        onMouseEnter={() => saveHoveredId(eachUser.id)}
                        onMouseLeave={() => setHoveredUserId(null)}
                      >
                        <div className="administrador-user-hovered-eliminar">
                          <RiDeleteBinLine />
                        </div>
                        <h3>Usuario: {eachUser.user}</h3>
                        <p>id: {eachUser.id}</p>
                        <div className="administrador-perfiles-pendingTasks">
                          <h4>Tareas pendientes:</h4>

                          <ul>
                            {Object.keys(eachUser.pendingTasks || {}).length >
                            0 ? (
                              eachUser.savedTasks.map((task, index) => (
                                <li key={index}>{task}</li>
                              ))
                            ) : (
                              <p>No hay tareas</p>
                            )}
                          </ul>
                        </div>

                        <div className="administrador-perfiles-tasks">
                          <h4>Tareas programadas:</h4>
                          <ul>
                            {Object.keys(eachUser.tasks || {}).length > 0 ? (
                              Object.entries(eachUser.tasks).map(
                                ([key, value]) => (
                                  <li key={key}>
                                    {key}: {value}
                                  </li>
                                )
                              )
                            ) : (
                              <p>No hay tareas</p>
                            )}
                          </ul>
                        </div>
                        {/* 
                    
                    )} */}
                      </div>
                    ) : (
                      <div
                        className="administrador-user"
                        onMouseEnter={() => setHoveredUserId(eachUser.id)}
                        onMouseLeave={() => setHoveredUserId(null)}
                      >
                        <h3>Usuario: {eachUser.user}</h3>
                        <p>id: {eachUser.id}</p>
                        <div className="administrador-perfiles-pendingTasks">
                          <h4>Tareas pendientes:</h4>
                          <ul>
                            {Object.keys(eachUser.pendingTasks || {}).length >
                            0 ? (
                              eachUser.savedTasks.map((task, index) => (
                                <li key={index}>{task}</li>
                              ))
                            ) : (
                              <p>No hay tareas</p>
                            )}
                          </ul>
                        </div>

                        <div className="administrador-perfiles-tasks">
                          <h4>Tareas programadas:</h4>
                          <ul>
                            {Object.keys(eachUser.tasks || {}).length > 0 ? (
                              Object.entries(eachUser.tasks).map(
                                ([key, value]) => (
                                  <li key={key}>
                                    {key}: {value}
                                  </li>
                                )
                              )
                            ) : (
                              <p>No hay tareas</p>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {showDeleteWindow && (
            <div className="administrador-ventanaEmergente">
              <div className="administrador-ventanaEmergente-cerrar">
                <IoClose onClick={() => handleCloseButton()} />
              </div>
              <div className="administrador-ventanaEmergente-info">
                <div className="administrador-ventanaEmergente-userSelected">
                  <p>Usuario seleccionado: {selectedUserToDelete.user}</p>
                  <p>Id: {selectedUserToDelete.id}</p>
                </div>
                <h2>¿Que deseas eliminar?</h2>
                <div className="administrador-ventanaEmergente-botones">
                  <button onClick={() => deleteAllTasks()}>
                    Tareas del usuario
                  </button>
                  <button onClick={() => deleteUser()}>Usuario</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No hay usuarios registrados</p>
      )}
    </div>
  );
};

export default AdministradorPerfiles;
