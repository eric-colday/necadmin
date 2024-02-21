import React from "react";
import Sidebar from "@/app/components/dashboard/sidebar/Sidebar";
import Footer from "@/app/components/dashboard/footer/Footer";

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
