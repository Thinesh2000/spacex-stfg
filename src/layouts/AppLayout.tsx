import {} from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <div className="bg-transparent text-gray-900 dark:text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
