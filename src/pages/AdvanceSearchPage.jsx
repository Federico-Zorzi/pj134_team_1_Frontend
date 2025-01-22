import HomePage from "./HomePage";
import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import HomepageCard from "../components/HomepageCard";
import SearchBar from "../components/SearchBar";
import { Badge } from "react-bootstrap";

export default function AdvanceSearchPage() {
  const badges = ["Filtro 1", "Filtro 2", "Filtro 3"];

  // take data from global context
  const dataContext = useDataContext();
  const { propertiesList, fetchIndexProperties } = dataContext;
  useEffect(fetchIndexProperties, []);

  //   Toggle badge function
  const toggleBadge = () => {
    console.log();
  };

  return (
    <>
      <div className="container py-5 min-vh-100">
        <h1>Advance Search</h1>
        <span>
          {badges.map((badge) => {
            return (
              <Badge className="me-1" key={badge}>
                {badge}
              </Badge>
            );
          })}
        </span>
        <SearchBar />
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
