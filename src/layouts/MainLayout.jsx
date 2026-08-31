import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
// import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import FloatingIcon from "../components/floatingIcons/FloatingIcons.jsx";
import ScrollToTop from "../components/floatingIcons/ScrollToTop.jsx";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />

      <div className="main-content">
        {/* <Sidebar /> */}

        <main>
          <Outlet />
          <FloatingIcon />
          <ScrollToTop />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
