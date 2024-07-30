import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import c from "./styles/navigation.module.css";

const Navigation = () => {
  return (
    <header className={c.navigation_header}>
      <div>
        <p>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? c.active_tab : "")}
          >
            FinHealth
          </NavLink>
        </p>
      </div>
      <div className={c.right_nav_container}>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? c.active_tab : "")}
            >
              My Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? c.active_tab : "")}
            >
              Financial Health Quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? c.active_tab : "")}
            >
              Profile
            </NavLink>
          </li>
        </ul>
        <div className={c.sign_in_container}>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? c.active_tab : "")}
          >
            Sign in
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
