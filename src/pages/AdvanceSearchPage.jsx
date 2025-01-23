import HomePage from "./HomePage";
import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import HomepageCard from "../components/HomepageCard";
import SearchBar from "../components/SearchBar";
import { Badge } from "react-bootstrap";

export default function AdvanceSearchPage() {
  // take data from global context
  const dataContext = useDataContext();
  const { propertiesList, fetchIndexProperties } = dataContext;
  useEffect(fetchIndexProperties, []);

  return (
    <>
      <div className="container  min-vh-100">
        <SearchBar propertiesList={propertiesList} />
        <div className="my-5"></div>
        {/* card container */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 homepage-card-container">
          {/* Cards */}
          {propertiesList.map((property) => {
            return <HomepageCard key={property.id} element={property} />;
          })}
        </div>
      </div>
    </>
  );
}
