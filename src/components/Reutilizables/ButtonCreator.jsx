import React from "react";
import { Button } from "react-bootstrap";

const ButtonCreator = ({ buttonContext, isButtonDisabled }) => {
  return (
    <Button disabled={isButtonDisabled} variant="primary">
      {buttonContext}
    </Button>
  );
};

export default ButtonCreator;
