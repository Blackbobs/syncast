import { useContext, createContext, useState } from "react";

export const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState('abeokuta');
  const [long, setLong] = useState("");
  const [latt, setLatt] = useState("");

  return (
    <StateContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        city,
        setCity,
        long,
        setLong,
        latt,
        setLatt,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
