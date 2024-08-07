import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import c from "./styles/navigation.module.css";

interface NavInterface {
  menuIsOpen: boolean;
  toggleMenuBar: () => void;
  isAnimating: boolean;
}

const Navigation: React.FC<NavInterface> = ({
  menuIsOpen,
  toggleMenuBar,
  isAnimating,
}) => {
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
            className={({ isActive }) =>
              `${isActive ? c.active_tab : ""} ${
                scrolled ? c.has_scrolled : ""
              }`
            }
            onClick={toggleMenuBar}
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
              className={({ isActive }) =>
                `${isActive ? c.active_tab : ""} ${
                  scrolled ? c.has_scrolled : ""
                }`
              }
            >
              My Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/quiz"
              className={({ isActive }) =>
                `${isActive ? c.active_tab : ""} ${
                  scrolled ? c.has_scrolled : ""
                }`
              }
            >
              Financial Health Quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${isActive ? c.active_tab : ""} ${
                  scrolled ? c.has_scrolled : ""
                }`
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
        <div className={c.sign_in_container}>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              `${isActive ? c.active_tab : ""} ${
                scrolled ? c.user_scrolled : ""
              }`
            }
          >
            Sign in
          </NavLink>
        </div>
      </div>
      <div className={c.hamburger_menu} onClick={toggleMenuBar}>
        {!menuIsOpen ? (
          <MenuIcon
            className={`${c.closed_menu} ${c.icon} ${
              isAnimating ? c.icon_exit : c.icon_enter
            }`}
          />
        ) : (
          <CloseIcon
            className={`${c.closed_menu} ${c.icon} ${
              isAnimating ? c.icon_exit : c.icon_enter
            }`}
          />
        )}
      </div>
    </header>
  );
};

export default Navigation;
