import React from "react";
import ReactDOM from "react-dom";

import { FC } from "../../../models/Main.model";

const SideDrawerPortal: React.FC<FC> = ({ children }) => {
  const portalRoot = document.getElementById("sidedrawer-root")!;
  return ReactDOM.createPortal(children, portalRoot);
};

export default SideDrawerPortal;
