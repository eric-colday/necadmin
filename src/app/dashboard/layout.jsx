import React from "react";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import Footer from "../components/dashboard/footer/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
