import React from "react";
import { FC } from "../../models/Main.model";
import Navigation from "./Navigation";
import Footer from "./Footer";
const Layout: React.FC<FC> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
