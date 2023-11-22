import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/hooks';
import jwt_decode from 'jwt-decode';

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
  isAdminPath?: boolean;
}

export interface TokenDecodedProps {
  id: number;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

const ProtectedRoute = ({
  children,
  redirectPath,
  isAdminPath = false,
}: ProtectedRouteProps) => {
  const token = useAppSelector((state) => state.auth.login.token);
  const tokenDecoded: TokenDecodedProps | null = token
    ? jwt_decode(token)
    : null;

  const isTokenValid = tokenDecoded && tokenDecoded.exp * 1000 > Date.now();
  const isAdmin = tokenDecoded && tokenDecoded.isAdmin;

  const renderContent = () => {
    if (isTokenValid) {
      if (isAdmin) {
        return children; // L'utilisateur est admin et a accès aux routes admin
      } else if (!isAdmin && !isAdminPath) {
        return children; // L'utilisateur n'est pas admin et a accès aux routes non-admin
      } else {
        return <Navigate to={redirectPath || '/'} replace />; // Redirection vers la page par défaut
      }
    } else {
      return <Navigate to="/login" replace />; // Redirection vers la page de connexion si le token n'est pas valide
    }
  };

  return <>{renderContent()}</>;
};

export default ProtectedRoute;
