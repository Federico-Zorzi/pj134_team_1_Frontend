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

  const fetchFilterProperties = (formFilterData) => {
    const city_url = formFilterData.city
      ? `?${city}=${formFilterData.city}&`
      : "";
    const address_url = formFilterData.address
      ? `?${address}=${formFilterData.address}&`
      : "";
    const n_Rooms_url = formFilterData.n_Rooms
      ? `?${n_Rooms}=${formFilterData.n_Rooms}&`
      : "";
    const n_Beds_url = formFilterData.n_Beds
      ? `?${n_Beds}=${formFilterData.n_Beds}&`
      : "";
    const property_type_url = formFilterData.property_type
      ? `?${property_type}=${formFilterData.property_type}`
      : "";

    const filters = fetch(
      serverUrl +
        `/filtered/${city_url}${address_url}${n_Rooms_url}${n_Beds_url}${property_type_url}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("filter", data);
        setPropertiesList(data);
      });
  };

  const dataContext = {
    propertiesList,
    property,
    fetchIndexProperties,
    fetchShowProperties,
    fetchFilterProperties,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};
