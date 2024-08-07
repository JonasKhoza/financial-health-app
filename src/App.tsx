import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/layout/Layout";

const Authentication = lazy(async () => {
  const module = await import("./pages/Authentication");
  return { default: module.default };
});

const HomePage = lazy(async () => {
  const module = await import("./pages/Home");
  return { default: module.default };
});

const FinancialHealthQuiz = lazy(async () => {
  const module = await import("./pages/FinancialHealthQuiz");
  return { default: module.default };
});

const Profile = lazy(async () => {
  const module = await import("./pages/Profile");
  return { default: module.default };
});

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<p>Loading</p>}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/auth"
            element={
              <Suspense fallback={<p>Loading!</p>}>
                <Authentication />
              </Suspense>
            }
          />
          <Route
            path="/quiz"
            element={
              <Suspense fallback={<p>Loading....</p>}>
                <FinancialHealthQuiz />
              </Suspense>
            }
          />

          <Route
            path="/profile"
            element={
              <Suspense fallback={<p>Loading....</p>}>
                <Profile />
              </Suspense>
            }
          />
          <Route path="/main2" element={<h1>Main</h1>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
