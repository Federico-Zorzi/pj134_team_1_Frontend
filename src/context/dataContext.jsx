import { text } from "@fortawesome/fontawesome-svg-core";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

const initialUserData = {
  name: "",
  surname: "",
  email: "",
  id: 0,
  isOwner: 0,
};

//* export context for consumers
export const useDataContext = () => useContext(DataContext);

//* export context for provider
export const DataContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL + "/properties";

  const [propertiesList, setPropertiesList] = useState([]);
  const [mostPopularPropertiesList, setMostPopularPropertiesList] = useState(
    []
  );
  const [restrictedMostPopPropertiesList, setRestrictedMostPopProperties] =
    useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const numPopularProperties = 8;
  const numRestrictedPopularProperties = 4;

  const [property, setProperty] = useState([]);

  //Users data
  const [userInformation, setUserInformation] = useState(initialUserData);
  const [userProperties, setUserProperties] = useState([]);

  useEffect(() => {
    if (userInformation.id !== 0) {
      setIsLoading(true);
      fetch("http://localhost:3000/users/getproperties/" + userInformation.id)
        .then((res) => res.json())
        .then((data) => {
          setUserProperties(data);
          setIsLoading(false);
        });
    }
  }, [userInformation.id, property, propertiesList]);

  const fetchIndexProperties = () => {
    setIsLoading(true);

    fetch(serverUrl)
      .then((res) => res.json())
      .then((data) => {
        setPropertiesList(data);

        const filterPopularProperties = data.filter(
          (property, index) => index < numPopularProperties
        );
        setMostPopularPropertiesList(filterPopularProperties);

        const restrictedFilterPopularProperties = data.filter(
          (property, index) => index < numRestrictedPopularProperties
        );
        setRestrictedMostPopProperties(restrictedFilterPopularProperties);

        setIsLoading(false);
      });
  };

  const fetchShowProperties = (id) => {
    setIsLoading(true);

    fetch(serverUrl + `/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data[0]);

        setIsLoading(false);
      });
  };

  const spacingFormat = (text) => {
    let formattedText = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        formattedText += "%20";
      } else formattedText += text[i];
    }
    return formattedText;
  };

  const fetchFilterProperties = async (formFilterData) => {
    try {
      const queryParams = new URLSearchParams();

      /*
      if (formFilterData.city) queryParams.append("city", formFilterData.city);
      if (formFilterData.address) queryParams.append("address", formFilterData.address); 
      */

      async function getCoordsFromAddress({
        number,
        streetName,
        municipality,
        postalCode,
      }) {
        const url = `https://api.tomtom.com/search/2/structuredGeocode.json?countryCode=IT&streetNumber=${number}&streetName=${streetName}&municipality=${municipality}&postalCode=${postalCode}&view=Unified&key=Wd3Yh5F6xZhjZ0ipPGN7tuRLcxHRnPGe`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          const { results } = data;

          const defPoint = results.filter(
            (point) =>
              point.address.streetName.toLowerCase() ===
                formFilterData.address.toLowerCase() &&
              point.address.municipality.toLowerCase() ===
                formFilterData.city.toLowerCase()
          );

          console.log(defPoint);
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      }

      const fullAddress = {
        number: formFilterData.numAddress,
        streetName: spacingFormat(formFilterData.address),
        municipality: spacingFormat(formFilterData.city),
        postalCode: formFilterData.zipCode,
      };

      if (
        formFilterData.address &&
        formFilterData.zipCode &&
        formFilterData.city
      ) {
        getCoordsFromAddress(fullAddress);
      }

      if (formFilterData.nRooms)
        queryParams.append("number_of_rooms", formFilterData.nRooms);
      if (formFilterData.nBeds)
        queryParams.append("number_of_beds", formFilterData.nBeds);
      if (formFilterData.propertyType)
        queryParams.append("property_type", formFilterData.propertyType);

      const response = await fetch(`${serverUrl}/filtered?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch filtered properties");
      const data = await response.json();
      setPropertiesList(data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
    }
  };

  const userData = {
    initialUserData,
    userInformation,
    setUserInformation,
    userProperties,
  };

  const dataContext = {
    propertiesList,
    property,
    mostPopularPropertiesList,
    restrictedMostPopPropertiesList,
    setRestrictedMostPopProperties,
    fetchIndexProperties,
    fetchShowProperties,
    fetchFilterProperties,
    userData,
    isLoading,
    setIsLoading,
    setProperty,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};
