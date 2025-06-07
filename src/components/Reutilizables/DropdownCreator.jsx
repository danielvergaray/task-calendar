import React, { useEffect, useState, useContext } from "react";
import InfoContext from "../context/InfoContext";
import Dropdown from "react-bootstrap/Dropdown";

const DropdownCreator = ({ props }) => {
  const { setHourSelected, optionSelected, setOptionSelected } =
    useContext(InfoContext);

  const saveOptionFunction = (option) => {
    setOptionSelected(
      option
    ); /* Sirve para guardar el valor que se va a mostrar en el input cuando se seleccione una hora */
    setHourSelected(option);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {optionSelected}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.map((option, index) => (
          <Dropdown.Item key={index} onClick={() => saveOptionFunction(option)}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownCreator;
