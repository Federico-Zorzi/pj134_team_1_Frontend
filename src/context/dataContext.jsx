import { createContext, useContext, useState } from "react";

const DataContext = createContext();

//* export context for consumers
export const useDataContext = () => useContext(DataContext);

//* export context for provider
export const DataContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL + "/properties";

  const [propertiesList, setPropertiesList] = useState([]);
  const [property, setProperty] = useState([]);

  const fetchIndexProperties = () => {
    fetch(serverUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("index", data);
        setPropertiesList(data);
      });
  };

  const fetchShowProperties = (id) => {
    fetch(serverUrl + `/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("show", data);
        setProperty(data);
      });
  };

  const dataContext = {
    propertiesList,
    property,
    fetchIndexProperties,
    fetchShowProperties,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};
