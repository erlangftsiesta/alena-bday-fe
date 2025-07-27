import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  const isLoginPage = location.pathname === "/login";

  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/send-message" replace />;
  }

  return <>{children}</>;
}

export function RootRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return <Navigate to={isAuthenticated ? "/homepage" : "/send-message"} replace />;
}
