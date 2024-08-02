import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import c from "./styles/navigation.module.css";

const Navigation = () => {
  // State to track if the header should have a different background color on scroll
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${c.navigation_header} ${scrolled ? c.scrolled : ""}`}>
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
            to="/auth"
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
