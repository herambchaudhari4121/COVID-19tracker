import React from "react";
import "./css/InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({
  title,
  cases,
  total,
  active,
  isRed,
  isGreen,
  isBlack,
  ...props
}) {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${isGreen && "infoBox--green"}`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2
          className={`infoBox__cases ${
            !isGreen && !isRed && "infoBox__cases--black"
          } ${!isRed && !isBlack && "infoBox__cases--green"}`}
        >
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
