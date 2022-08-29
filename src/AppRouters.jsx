import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import('./Components/Home'))
const AuthComponents = lazy(() => import('./Components/AuthComponents'))
const CreateEmployee = lazy(() => import('./Components/CreateEmployee'))
const OrganizationChart = lazy(() => import('./Components/OrganizationChart'))

const AppRouters = () => {

  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthComponents />} />
          <Route exact path="/create" element={<CreateEmployee />} />
          <Route exact path="/chart" element={<OrganizationChart />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRouters;