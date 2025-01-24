import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import HomepageCard from "../components/HomepageCard";

export default function HomePage() {
  // take data from global context
  const dataContext = useDataContext();
  const { propertiesList, fetchIndexProperties } = dataContext;

  useEffect(fetchIndexProperties, []);

  const [mostPopularProperties, setMostPopularProperties] = useState([]);
  const [actualIndex, setActualIndex] = useState(0);
  const filterPopularProperties = propertiesList.filter(
    (property, index) => index < 8
  );

  const visMostPopular = (actualIndex) => {
    const actualPopularProperties = [];

    for (let i = actualIndex; i < actualIndex + 4; i++) {
      actualPopularProperties.push(filterPopularProperties[i]);
    }

    setMostPopularProperties(actualPopularProperties);
    setActualIndex(actualIndex + 1);
  };

  console.log(actualIndex);

  return (
    <main>
      <div className="container py-3">
        <div className="d-flex flex-column gap-3 align-items-center my-5">
          <h1 className="fw-bold">I più gettonati ✨</h1>
        </div>
        {actualIndex < filterPopularProperties.length - 4 ? (
          <button onClick={() => visMostPopular(actualIndex)}>Avanti</button>
        ) : (
          ""
        )}

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 homepage-card-container">
          {/* Cards */}
          {mostPopularProperties.map((property) => {
            return (
              <HomepageCard
                key={property.id}
                element={property}
                link={{
                  to: "/properties/" + property.id,
                }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
