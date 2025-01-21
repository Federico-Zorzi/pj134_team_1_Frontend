import { createContext, useContext } from "react";
import { tempDataProperties } from "../assets/data/tempData";

const DataContext = createContext();

//* export context for consumers
export const useDataContext = () => useContext(DataContext);

//* export context for provider
export const DataContextProvider = ({ children }) => {
  const dataContext = {
    tempDataProperties,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};
