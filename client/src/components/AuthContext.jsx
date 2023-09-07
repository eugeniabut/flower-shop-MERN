import React,{ createContext, useState} from 'react';

const AuthContext = createContext();

 const AuthProvider =({ children }) =>{
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');

  
  const handleSignIn = (user) => {
    setIsSignedIn(true);
    setUserName(user);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserName('');
  };


  return (
    <AuthContext.Provider value={{ isSignedIn, handleSignIn, handleSignOut,userName }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };