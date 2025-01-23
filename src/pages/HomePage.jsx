import { useDataContext } from "../context/dataContext";
import { useEffect } from "react";
import HomepageCard from "../components/HomepageCard";
import HomepageCarousel from "../components/HomepageCarousel";

export default function HomePage() {
  // take data from global context
  const dataContext = useDataContext();

  const { propertiesList, fetchIndexProperties } = dataContext;
  useEffect(fetchIndexProperties, []);

  return (
    <main>
      <div className="container py-3">
        <div className="d-flex flex-column gap-3 align-items-center my-5">
          <h1 className="fw-bold ">
            I migliori per te
            <i class="fa-regular fa-map ms-3" />
          </h1>
        </div>
        <HomepageCarousel />

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 homepage-card-container">
          {/* Cards */}
          {propertiesList.map((property) => {
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
