// // GlobalStateContext.js
// import React, { createContext, useContext, useState } from 'react';

// // Create a new context for global state
// const GlobalStateContext = createContext();

// // Define a provider component to wrap your entire application
// export const GlobalStateProvider = ({ children }) => {
//   const [globalState, setGlobalState] = useState("");

//   return (
//     <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// // Custom hook to access the global state and setter
// export const useGlobalState = () => useContext(GlobalStateContext);