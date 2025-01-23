import HomePage from "./HomePage";
import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import AdvancedSearchCard from "../components/AdvancedSearchCard";
import SearchBar from "../components/SearchBar";
import { Badge } from "react-bootstrap";

export default function AdvanceSearchPage() {
  // take data from global context
  const dataContext = useDataContext();
  const { propertiesList, fetchIndexProperties } = dataContext;
  useEffect(fetchIndexProperties, []);

  return (
    <>
      <div className="container min-vh-100">
        <SearchBar propertiesList={propertiesList} />
        <div className="my-5"></div>
        {/* card container */}
        <div class="row row-cols-1 row-cols-xl-2 g-4 homepage-card-container">
          {/* Cards */}
          {propertiesList.map((property) => {
            return <AdvancedSearchCard key={property.id} element={property} />;
          })}
        </div>
      </div>
    </>
  );
}
