import { Label } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form/Form";

import c from "./styles/authentication.module.css";
import {
  UserAuthI,
  UserAuthInterface,
} from "../models/Authentication/Auth.model";

const Authentication = () => {
  function getUserAuthenticationData(userData: UserAuthI) {
    console.log(userData);
  }

  return (
    <div className={c.container}>
      <Form getUserAuthenticationData={getUserAuthenticationData} />
    </div>
  );
};

export default Authentication;
