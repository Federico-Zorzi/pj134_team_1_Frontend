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

  const fetchFilterProperties = async (formFilterData) => {
    try {
      const queryParams = new URLSearchParams();

      if (formFilterData.city) queryParams.append("city", formFilterData.city);
      if (formFilterData.address)
        queryParams.append("address", formFilterData.address);
      if (formFilterData.nRooms)
        queryParams.append("n_Rooms", formFilterData.nRooms);
      if (formFilterData.nBeds)
        queryParams.append("n_Beds", formFilterData.nBeds);
      if (formFilterData.propertyType)
        queryParams.append("property_type", formFilterData.propertyType);

      const response = await fetch(`${serverUrl}/filtered?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch filtered properties");
      const data = await response.json();
      console.log("filter", data);
      setPropertiesList(data);
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
    }
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
