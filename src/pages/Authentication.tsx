import { Label } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

import c from "./styles/authentication.module.css";

const Authentication = () => {
  return (
    <div className={c.container}>
      <Form />
    </div>
  );
};

export default Authentication;
