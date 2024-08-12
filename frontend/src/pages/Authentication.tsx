import { Label } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form/Form";

import c from "./styles/authentication.module.css";
import {
  UserAuthI,
  UserAuthInterface,
} from "../models/Authentication/Auth.model";
import { SERVER_URL } from "../utils/server.utils";

const Authentication = () => {
  async function getUserAuthenticationData(userData: UserAuthI) {
    const res = await fetch(`${SERVER_URL}/users/auth`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className={c.container}>
      <Form getUserAuthenticationData={getUserAuthenticationData} />
    </div>
  );
};

export default Authentication;
