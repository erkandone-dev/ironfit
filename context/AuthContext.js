import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [account, setAccount] = useState({
    email: "erkndne53@gmail.com",
    password: "123456"
  });

  const login = (email, password) => {
  if(email==="register"){
    setUser("REGISTER");
    return;
  }

  if(email === account.email && password === account.password){
    setUser({ email });
  } else {
    alert("E-posta veya şifre yanlış");
  }
};


  const register = (email, password) => {
    setAccount({ email, password });
    setUser({ email });
    alert("Kayıt başarılı!");
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

