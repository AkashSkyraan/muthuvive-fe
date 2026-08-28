import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../views/public/home/Index";
import About from "../views/public/about/index";

// import Home from "../views/public/home/Our.jsx";
// import Search from "../pages/Search";
// import Recipe from "../pages/Recipe";
// import About from "../pages/About";

const publicRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    {/* <Route path="/recipe/:id" element={<Recipe />} /> */}
    {/* <Route path="/about" element={<About />} /> */}
  </Route>
);

export default publicRoutes;
