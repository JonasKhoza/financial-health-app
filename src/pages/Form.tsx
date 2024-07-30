import React from "react";
import { Button } from "@mui/material";

import c from "./styles/form.module.css";

const Form = () => {
  return (
    <form className={c.form_container}>
      <h1>Create account!</h1>
      <div className={c.inputs_container}>
        <p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value=""
          />
        </p>
        <p>
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="you@example.com"
            value=""
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value=""
          />
        </p>
      </div>
      <div className={c.actions_container}>
        <Button className={c.authentication_btn}>Create account</Button>
        <button className={c.authentication_btn}>Test</button>
        <p>
          Already have an account?<span> Login here.</span>
        </p>
      </div>
    </form>
  );
};

export default Form;
