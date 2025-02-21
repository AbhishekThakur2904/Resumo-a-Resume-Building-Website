import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Basic from "./layouts/Basic";
import AdminHomepage from "./page/UserHomepage";
import { useAppSelector } from "./redux/store";
import React from "react";
import LazyComponent from "./components/common/LazyComponent";
import SplashScreen from "./components/common/SplashScreen";
import { AnimatePresence } from "motion/react";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ResumeDetailsPage from "./page/ResumeDetailsPage";
const LoginPage = React.lazy(() => import("./page/LoginPage"));
const HomePage = React.lazy(() => import("./page/HomePage"));
const RegisterPage = React.lazy(() => import("./page/RegisterPage"));
const Admin = React.lazy(() => import("./layouts/User"));
const ForgotPassword = React.lazy(() => import("./page/ForgotPassword"));
const UpdatePasswordPage = React.lazy(
  () => import("./page/UpdatePasswordPage")
);
const NotFound = React.lazy(() => import("./page/NotFound"));
const CreateResumePage = React.lazy(() => import("./page/CreateResumePage"));
const ResumeBuilder = React.lazy(() => import("./page/ResumeBuilder"));

type Props = {};

const App = (props: Props) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <SplashScreen />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/update-password/:token"
            element={<UpdatePasswordPage />}
          />
          {(user?.role === "ADMIN" || user?.role === "USER") && (
            <Route element={<Admin />}>
              <Route
                path="/"
                element={
                  <LazyComponent>
                    <AdminHomepage />
                  </LazyComponent>
                }
              />
              <Route
                path="/resume/create"
                element={
                  <LazyComponent>
                    <CreateResumePage />
                  </LazyComponent>
                }
              />
              <Route
                path="/resume"
                element={
                  <LazyComponent>
                    <ResumeBuilder />
                  </LazyComponent>
                }
              />
              <Route
                path="/resume/:id"
                element={
                  <LazyComponent>
                    <ResumeDetailsPage />
                  </LazyComponent>
                }
              />
            </Route>
          )}
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route element={<Basic />}>
            <Route
              path="/login"
              element={
                <LazyComponent>
                  <LoginPage />
                </LazyComponent>
              }
            />
            <Route
              path="/register"
              element={
                <LazyComponent>
                  <RegisterPage />
                </LazyComponent>
              }
            />
            <Route
              path="*"
              element={
                <LazyComponent>
                  <NotFound />
                </LazyComponent>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
      <LanguageSwitcher />
    </>
  );
};

export default App;
