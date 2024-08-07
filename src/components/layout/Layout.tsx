import React, { useState } from "react";
import { FC } from "../../models/Main.model";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SideDrawerPortal from "./Side_drawer/SideDrawerPortal";
import SideDrawer from "./SideDrawer";
const Layout: React.FC<FC> = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function toggleMenuBar() {
    setIsAnimating(true);
    setTimeout(() => {
      setMenuIsOpen((prev) => !prev);
      setIsAnimating(false);
    }, 500); // Match this duration with the CSS animation duration
  }

  return (
    <>
      <Navigation
        menuIsOpen={menuIsOpen}
        toggleMenuBar={toggleMenuBar}
        isAnimating={isAnimating}
      />
      <SideDrawerPortal>
        <SideDrawer menuIsOpen={menuIsOpen} toggleMenuBar={toggleMenuBar} />
      </SideDrawerPortal>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
