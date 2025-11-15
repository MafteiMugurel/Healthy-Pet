import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? children : <Navigate to="/" replace />;
}
