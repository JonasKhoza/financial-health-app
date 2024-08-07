import React, { useState } from "react";
import { Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import c from "./styles/form.module.css";
import {
  UserAuthI,
  UserAuthInterface,
} from "../../models/Authentication/Auth.model";

const initialUserAuthState: UserAuthInterface = {
  username: "",
  email: "",
  password: "",
};

interface FormInterface {
  getUserAuthenticationData: (userData: UserAuthI) => void;
}

const Form: React.FC<FormInterface> = ({ getUserAuthenticationData }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSignin, setIsSignin] = useState<boolean>(true);
  const [userData, setUserData] =
    useState<UserAuthInterface>(initialUserAuthState);

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

  function getOnchangeUserAuthData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserData((prevV) => {
      return { ...prevV, [name]: value };
    });
  }

  function submitUserDataHandler(e: React.FormEvent) {
    e.preventDefault();
    if (isSignin) {
      const userInfo: UserAuthI = {
        username: userData.username,
        password: userData.password,
        isSignin: isSignin,
      };
      getUserAuthenticationData(userInfo);
    } else {
      const userInfo: UserAuthI = {
        email: userData.email,
        password: userData.password,
        isSignin: isSignin,
      };
      getUserAuthenticationData(userInfo);
    }
  }

  return (
    <form className={c.form_container}>
      <h1>{isSignin ? "Sign in" : "Create account!"}</h1>
      <div className={c.inputs_container}>
        {isSignin && (
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={userData.username}
              onChange={getOnchangeUserAuthData}
            />
          </p>
        )}

        {!isSignin && (
          <p>
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={userData.email}
              onChange={getOnchangeUserAuthData}
            />
          </p>
        )}

        <p>
          <label htmlFor="password">Password</label>
          <span className={c.password_container}>
            <input
              type={isVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={getOnchangeUserAuthData}
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
        <Button
          className={c.authentication_btn}
          variant="contained"
          onClick={submitUserDataHandler}
        >
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
