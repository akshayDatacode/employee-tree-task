import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import('./Components/Home'))
const Login = lazy(() => import('./Components/Login'))
const CreateEmployee = lazy(() => import('./Components/CreateEmployee'))

const AppRouters = () => {

  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/create" element={<CreateEmployee />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRouters;