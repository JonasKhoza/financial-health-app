import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/layout/Layout";

const Authentication = lazy(async () => {
  const module = await import("./pages/Authentication");
  return { default: module.default };
});

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<p>Loading!</p>}>
                <Authentication />
              </Suspense>
            }
          />
          <Route path="/" element={<h1>Home</h1>} />
          <Route
            path="/signin"
            element={
              <Suspense fallback={<p>Loading!</p>}>
                <Authentication />
              </Suspense>
            }
          />
          <Route path="/main" element={<h1>Main</h1>} />
          <Route path="/main2" element={<h1>Main</h1>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
