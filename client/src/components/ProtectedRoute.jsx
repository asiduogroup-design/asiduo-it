import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, redirectTo }) {

  const location = useLocation();
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }

  const fallbackLoginPath =
    redirectTo || (location.pathname.startsWith("/it") ? "/it/login" : "/login");

  const redirectTarget = `${location.pathname}${location.search}`;
  const loginPath = `${fallbackLoginPath}?redirect=${encodeURIComponent(redirectTarget)}`;

  return <Navigate to={loginPath} replace />;

}
