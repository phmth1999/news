import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";


const Admin = () => {
  return (
    <>
        <div id="wrapper">
          <Header />
          <Outlet />
          <Footer />
        </div>
    </>
  );
};

export default Admin;