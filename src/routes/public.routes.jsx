import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../views/public/home/Hero.jsx";
// import Home from "../views/public/home/Our.jsx";
// import Search from "../pages/Search";
// import Recipe from "../pages/Recipe";
// import About from "../pages/About";

const publicRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<Search />} />
    {/* <Route path="/recipe/:id" element={<Recipe />} /> */}
    {/* <Route path="/about" element={<About />} /> */}
  </Route>
);

export default publicRoutes;
