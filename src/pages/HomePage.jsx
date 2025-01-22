import { useDataContext } from "../context/dataContext";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import HomepageCard from "../components/HomepageCard";

export default function HomePage() {
  //* take data from global context
  const dataContext = useDataContext();

  const { propertiesList, fetchIndexProperties } = dataContext;
  useEffect(fetchIndexProperties, []);

  return (
    <main>
      <div className="container pt-3">
        <h1 className="my-5">I più gettonati✨</h1>

        <div className="row g-3 homepage-card-container">
          {/* cards */}
          {propertiesList.map((property) => {
            return <HomepageCard key={property.id} element={property} />;
          })}
        </div>
      </div>
    </main>
  );
}
