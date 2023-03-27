import React from "react";
import { Route, Routes } from "react-router-dom";

import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import ForgatePass from "../components/ForgatePass";
import Product from "../view/Product";
import ViewProduct from "../components/ViewProduct";
import EditeProfile from "../components/EditeProfile";
import PrivateRoutes from "../app/PrivateRoutes";

function Router() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/" exact element={<Product />} />
          <Route path="*" exact element={<Product />} />
          <Route path="/upadatepass" exact element={<ForgatePass />} />
          <Route path="/viewproduct/:id" exact element={<ViewProduct />} />
          <Route path="/editeprofile" exact element={<EditeProfile />} />
        </Route>
        <Route path="*" element={<LogIn />} />
         <Route path="/login"  element={<LogIn />} />
        <Route path="/signup"  element={<SignUp />} />
       
        
      </Routes>
    </>
  );
}

export default Router;
