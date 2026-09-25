import { Route } from "react-router-dom";
import Login from "../views/auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import ForgotPassword from "../views/auth/ForgotPassword";
import Signup from "../views/auth/Signup";
import VerifyOTP from "../views/auth/VerifyOTP";
import ChangePassword from "../views/auth/ChangePassword";
import VerifyPassword from "../views/auth/VerifyPassword";
import Change from "../views/auth/Change";

const AuthRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/verify-otp" element={<VerifyOTP />} />
    <Route path="/reset-password" element={<ChangePassword />} />
    <Route path="/verify-password" element={<VerifyPassword />} />
    <Route path="/change" element={<Change />} />
  </Route>
);

export default AuthRoutes;
