import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
// import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* <Header /> */}

      <div className="main-content">
        {/* <Sidebar /> */}

        <main>
          <Outlet />
        </main>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
