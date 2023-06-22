import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/web/Header";
import Footer from "../components/web/Footer";

const Web = () => {
  return (
    <>
      <div  id="wrapper">
        <Header  />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Web;