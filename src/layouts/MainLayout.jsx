import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
// import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import FloatingIcon from "../components/floatingIcons/FloatingIcons.jsx";
import ScrollToTop from "../components/floatingIcons/ScrollToTop.jsx";
import { AboutUsProvider } from "../context/AboutusContext.jsx";
import { EnquiryProvider } from "../context/EnquiryContext.jsx";
import StatusMessage, {
  showStatusMessage,
} from "../components/common/MessagePopup.jsx";
import { useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.showSuccessMessage) {
      showStatusMessage({
        type: "success",
        text: location.state.message || "Property added successfully",
      });

      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location, navigate]);

  return (
    <>
      <StatusMessage placement="top-center" />
      <EnquiryProvider>
        <AboutUsProvider>
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
        </AboutUsProvider>
      </EnquiryProvider>
      {/* </StatusMessage> */}
    </>
  );
};

export default MainLayout;
