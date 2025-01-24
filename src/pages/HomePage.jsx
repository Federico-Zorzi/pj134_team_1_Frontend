import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import HomepageCard from "../components/HomepageCard";
import HomepageCarousel from "../components/HomepageCarousel";

import { Col, Row } from "react-bootstrap";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomePage() {
  // take data from global context
  const dataContext = useDataContext();
  const {
    propertiesList,
    mostPopularPropertiesList,
    restrictedMostPopPropertiesList,
    setRestrictedMostPopProperties,
    fetchIndexProperties,
  } = dataContext;

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
    <main>
      <div className="container py-3">
        <HomepageCarousel />

        <h1 className="fw-bold mb-4 homepage-most-searched">
          I più cercati
          <i className="fa-regular fa-map ms-3" />
        </h1>
        <Row className="align-items-center">
          <Col xs={1}>
            {/* backward arrow */}
            {actualIndex > 0 ? (
              <button
                className="arrows-btn bg-transparent"
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
          </Col>

          <Col>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 homepage-card-container">
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
          </Col>

          <Col xs={1}>
            {/* forward arrow */}
            {actualIndex < mostPopularPropertiesList.length - 4 ? (
              <button
                className="arrows-btn bg-transparent"
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
          </Col>
        </Row>
      </div>
    </main>
  );
}
