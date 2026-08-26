import { Route } from "react-router-dom";
import Login from "../views/auth/Login";
import AuthLayout from "../layouts/AuthLayout";

const AuthRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
  </Route>
);

export default AuthRoutes;
