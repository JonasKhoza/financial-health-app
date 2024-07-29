import React from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/test" element={<h1>Test</h1>} />
          <Route path="/main" element={<h1>Main</h1>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
