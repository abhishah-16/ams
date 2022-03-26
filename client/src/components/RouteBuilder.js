import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerSignup from "./screens/CustomerSignup";
import Home from "./screens/Home";
import Login from "./screens/Login";
import ManagerSignup from "./screens/ManagerSignup";
import OrganizerSignup from "./screens/OrganizerSignup";
import SignUp from "./screens/Signup";

const RouteBuilder = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/signup" element={<SignUp />}></Route>
      <Route exact path="/customer/signup" element={<CustomerSignup />}></Route>
      <Route exact path="/manager/signup" element={<ManagerSignup />}></Route>
      <Route
        exact
        path="/organizer/signup"
        element={<OrganizerSignup />}
      ></Route>
    </Routes>
  );
};

export default RouteBuilder;
