import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState({
    // Inicialize seu estado compartilhado aqui
    enchiridions: [
      {
        id: 1,
        reason_consult: "tomou laxante",
        measurement: "nao sei",
        weight: 50,
        teacher_id: 2
      }
    ]
  });

  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </AppContext.Provider>
  );
};
