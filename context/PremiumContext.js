import React, { createContext, useState } from "react";

export const PremiumContext = createContext();

export function PremiumProvider({ children }) {
  const [premium, setPremium] = useState(false);

  return (
    <PremiumContext.Provider value={{ premium, setPremium }}>
      {children}
    </PremiumContext.Provider>
  );
}
