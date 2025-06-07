import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardCreator = ({ taskObject, date, time, activity }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Text>{time}</Card.Text>
        <Card.Text>{activity}</Card.Text>
        <Button variant="primary">Marcar como completa</Button>
      </Card.Body>
    </Card>
  );
};

export default CardCreator;
