import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    // Implement your sign-in logic here
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    // Implement your sign-out logic here
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
