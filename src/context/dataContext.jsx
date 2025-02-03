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

  const [searchedPoint, setSearchedPoint] = useState([]);
  const [propertiesListWithDistance, setPropertiesListWithDistance] = useState(
    []
  );

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

      if (formFilterData.city)
        queryParams.append("municipality", formFilterData.city);
      if (formFilterData.address)
        queryParams.append("address", formFilterData.address);
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

  const fetchFilterByDistance = async (formFilterDataDistanceKm) => {
    try {
      async function getCoordsFromAddress({
        number,
        streetName,
        municipality,
      }) {
        const url = `https://api.tomtom.com/search/2/structuredGeocode.json?countryCode=IT&streetNumber=${number}&streetName=${streetName}&municipality=${municipality}&view=Unified&key=Wd3Yh5F6xZhjZ0ipPGN7tuRLcxHRnPGe`;

        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2 - lat1); // deg2rad below
          var dLon = deg2rad(lon2 - lon1);
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
              Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c; // Distance in km
          return d;
        }
        function deg2rad(deg) {
          return deg * (Math.PI / 180);
        }

        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);

          const { results } = data;

          if (results.length > 0) {
            const resultSearchedPoint = results.filter((point, index) => {
              return (
                point.address.streetName &&
                point.address.streetName.toLowerCase() ===
                  formFilterDataDistanceKm.addressDistanceKm.toLowerCase() &&
                point.address.municipality &&
                point.address.municipality.toLowerCase() ===
                  formFilterDataDistanceKm.cityDistanceKm.toLowerCase()
              );
            });
            setSearchedPoint(resultSearchedPoint);

            console.log("searchedPoint", resultSearchedPoint);

            const propertiesWithDistance =
              resultSearchedPoint.length > 0 &&
              propertiesList
                .map((property) => {
                  const distanceKm = getDistanceFromLatLonInKm(
                    property.latitude,
                    property.longitude,
                    resultSearchedPoint[0].position.lat,
                    resultSearchedPoint[0].position.lon
                  );

                  return {
                    ...property,
                    distanceKm: parseFloat(distanceKm.toFixed(1)),
                  };
                })
                .sort((a, b) => a.distanceKm - b.distanceKm);

            setPropertiesListWithDistance(propertiesWithDistance);
          } else setPropertiesListWithDistance([]);
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      }

      const fullAddress = {
        number: formFilterDataDistanceKm.numAddressDistanceKm,
        streetName: spacingFormat(formFilterDataDistanceKm.addressDistanceKm),
        municipality: spacingFormat(formFilterDataDistanceKm.cityDistanceKm),
      };

      if (
        formFilterDataDistanceKm.addressDistanceKm &&
        formFilterDataDistanceKm.cityDistanceKm
      ) {
        getCoordsFromAddress(fullAddress);
      }
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
    propertiesListWithDistance,
    property,
    mostPopularPropertiesList,
    restrictedMostPopPropertiesList,
    setRestrictedMostPopProperties,
    fetchIndexProperties,
    fetchShowProperties,
    fetchFilterProperties,
    fetchFilterByDistance,
    userData,
    isLoading,
    setIsLoading,
    setProperty,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};
