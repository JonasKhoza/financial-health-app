import React from "react";

import c from "./styles/navigation.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

interface SidedrawerInterface {
  menuIsOpen: boolean;
  toggleMenuBar: () => void;
}

const SideDrawer: React.FC<SidedrawerInterface> = ({
  menuIsOpen,
  toggleMenuBar,
}) => {
  return (
    <nav
      className={menuIsOpen ? `${c.side_drawer} ${c.active}` : c.side_drawer}
    >
      <ul>
        <li onClick={toggleMenuBar}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? c.active : "")}
          >
            My Dashboard
          </NavLink>
        </li>
        <li onClick={toggleMenuBar}>
          <NavLink
            to="/quiz"
            className={({ isActive }) => (isActive ? c.active : "")}
          >
            Financial Health Quiz
          </NavLink>
        </li>
        <li onClick={toggleMenuBar}>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? c.active : "")}
          >
            Profile
          </NavLink>
        </li>
        <li onClick={toggleMenuBar}>
          <NavLink
            to="/auth"
            className={({ isActive }) => (isActive ? c.active : "")}
          >
            Sign up
          </NavLink>
        </li>
        <li onClick={toggleMenuBar}>
          <NavLink
            to="/auth"
            className={({ isActive }) => (isActive ? c.active : "")}
          >
            Sign in
          </NavLink>
        </li>
        <li>
          <Button className={c.log_out}>Sign out</Button>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
