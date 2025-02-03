import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomepageCard from "../components/HomepageCard";
import HomepageCarousel from "../components/HomepageCarousel";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLayoutContext } from "../context/layoutContext";

export default function HomePage() {
  // take data from global context
  const {
    mostPopularPropertiesList,
    restrictedMostPopPropertiesList,
    setRestrictedMostPopProperties,
    fetchIndexProperties,
    isLoading,
  } = useDataContext();

  const { toggleDarkMode } = useLayoutContext();

  useEffect(fetchIndexProperties, []);

  const [actualIndex, setActualIndex] = useState(0);

  const visMostPopular = (currentIndex) => {
    const actualPopularProperties = [];

    for (let i = currentIndex; i < currentIndex + 4; i++) {
      actualPopularProperties.push(mostPopularPropertiesList[i]);
    }

    setRestrictedMostPopProperties(actualPopularProperties);
  };
  const forwardMostPopularProp = () => {
    visMostPopular(actualIndex + 1);
    setActualIndex(actualIndex + 1);
  };
  const backwardMostPopularProp = () => {
    visMostPopular(actualIndex - 1);
    setActualIndex(actualIndex - 1);
  };

  return (
    <main data-dark-mode={toggleDarkMode}>
      <div className="container">
        <h1 className="fw-bold text-center text-shadow mt-4">
          {/* Link per l'AdvancedSearchPage */}
          <Link to="/advanceSearch" className="title-link">
            Prenota{" "}
            <i className="fa-solid fa-suitcase-rolling fa-bounce fa-2xs "></i>{" "}
            case
          </Link>{" "}
          al mare, ville, chalet
        </h1>

        <h2 className="text-center text-shadow my-3 pb-4">
          e molto altro per le tue vacanze in tutta Italia!
        </h2>

        <HomepageCarousel />

        <h2 className="fw-bold mb-4 homepage-most-searched">
          I più cercati
          <i className="fa-regular fa-map ms-3" />
        </h2>
        <div className="most-searched-properties">
          {isLoading ? (
            <div className="d-flex spinner-container justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* backward arrow */}
              {actualIndex > 0 ? (
                <button
                  className="left-arrow arrows-btn bg-transparent"
                  onClick={backwardMostPopularProp}
                >
                  <FontAwesomeIcon
                    className="arrows-btn-icon"
                    icon={faArrowRightLong}
                    size="2xl"
                    flip="horizontal"
                  />
                </button>
              ) : (
                ""
              )}
              {/* forward arrow */}
              {actualIndex < mostPopularPropertiesList.length - 4 ? (
                <button
                  className="right-arrow arrows-btn bg-transparent"
                  onClick={forwardMostPopularProp}
                >
                  <FontAwesomeIcon
                    className="arrows-btn-icon"
                    icon={faArrowRightLong}
                    size="2xl"
                  />
                </button>
              ) : (
                ""
              )}
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 homepage-card-container pb-5">
                {/* Cards */}
                {restrictedMostPopPropertiesList.map((property) => {
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
            </>
          )}
        </div>
      </div>
    </main>
  );
}
