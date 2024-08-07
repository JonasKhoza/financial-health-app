import React, { useState } from "react";
import { Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import c from "./styles/form.module.css";

const Form = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSignin, setIsSignin] = useState<boolean>(true);

  function changeVisibility() {
    setIsVisible((prevV: boolean) => {
      return !prevV;
    });
  }

  function setAuthenticationPageContent() {
    setIsSignin((prevV) => {
      return !prevV;
    });
  }

  console.log(isSignin);

  return (
    <form className={c.form_container}>
      <h1>{isSignin ? "Sign in" : "Create account!"}</h1>
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
        {!isSignin && (
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
        )}

        <p>
          <label htmlFor="password">Password</label>
          <span className={c.password_container}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value=""
            />
            {isVisible ? (
              <VisibilityOff
                className={c.visibility_icon}
                onClick={changeVisibility}
              />
            ) : (
              <Visibility
                className={c.visibility_icon}
                onClick={changeVisibility}
              />
            )}
          </span>
        </p>
      </div>
      <div className={c.actions_container}>
        <Button className={c.authentication_btn} variant="contained">
          {isSignin ? "Sign in" : "Create account"}
        </Button>
        <p>
          {isSignin ? "Don't have an account? " : "Already have an account? "}{" "}
          <span onClick={setAuthenticationPageContent}>
            {isSignin ? "Sign up here" : "Sign in here."}{" "}
          </span>
        </p>
      </div>
      {isSignin && (
        <p className={c.recover_details}>
          <span>Forgot password?</span> <span>|</span>{" "}
          <span>Forgot username?</span>
        </p>
      )}
    </form>
  );
};

export default Form;
