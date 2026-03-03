import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const logged = localStorage.getItem('logged');
  if (!logged) {
    return <Navigate to="/login" />;
  }
  return children;
};
