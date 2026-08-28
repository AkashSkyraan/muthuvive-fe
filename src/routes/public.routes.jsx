import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../views/public/home/Hero.jsx";
import SearchPage from "../views/public/search/SearhPage.jsx";
import Pagination from "../components/common/pagination/Pagination.jsx";

// import Home from "../views/public/home/Our.jsx";
// import Search from "../pages/Search";
// import Recipe from "../pages/Recipe";
// import About from "../pages/About";

const publicRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/page" element={<Pagination />} />
  </Route>
);

export default publicRoutes;
