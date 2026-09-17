import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

<<<<<<< HEAD
// import Home from "../views/public/home/Hero.jsx";
import SearchPage from "../views/public/search/SearhPage.jsx";
=======
import SearchPage from "../views/public/search/index.jsx";
>>>>>>> cf0066869a199779f6178c8e14faef49decdb297
import Pagination from "../components/common/pagination/Pagination.jsx";
import Home from "../views/public/home/Index.jsx";
import About from "../views/public/about/index";
import Gallery from "../views/public/gallery/index.jsx";
import Contact from "../views/public/contact/index.jsx";
import ProfilePage from "../views/public/profilepage/ProfilePage.jsx";

// import Home from "../views/public/home/Our.jsx";
// import Search from "../pages/Search";
// import Recipe from "../pages/Recipe";
// import About from "../pages/About";

const publicRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/page" element={<Pagination />} />
    <Route path="/about" element={<About />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/contactus" element={<Contact />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Route>
);

export default publicRoutes;
