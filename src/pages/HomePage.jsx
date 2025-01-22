import { useDataContext } from "../context/dataContext";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import HomepageCard from "../components/HomepageCard";
import { Button } from "react-bootstrap";

export default function HomePage() {
  // take data from global context
  const dataContext = useDataContext();

  const { propertiesList, fetchIndexProperties } = dataContext;
  useEffect(fetchIndexProperties, []);

  return (
    <main>
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center my-5">
          <h1>I più gettonati✨</h1>
          <Button as={Link} to="/advanceSearch">
            Vai alla ricerca avanzata
          </Button>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 homepage-card-container">
          {/* Cards */}
          {propertiesList.map((property) => {
            return <HomepageCard key={property.id} element={property} />;
          })}
        </div>
      </div>
    </main>
  );
}
