import { useState, createContext, useContext } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);

const fakeAuth = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);

    const origin = location.pathname || '/dashboard';
    navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const authContext = {
    token,
    login: handleLogin,
    logout: handleLogout,
  };
  
  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}

