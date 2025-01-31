import HomePage from "./HomePage";
import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import AdvancedSearchCard from "../components/AdvancedSearchCard";
import SearchBar from "../components/SearchBar";
import { Pagination } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

import { useLayoutContext } from "../context/layoutContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

export default function AdvanceSearchPage() {
  // take data from global context
  const {
    propertiesList,
    propertiesListWithDistance,
    fetchIndexProperties,
    isLoading,
  } = useDataContext();
  const { toggleDarkMode } = useLayoutContext();

  useEffect(fetchIndexProperties, []);

  const numForPagination = 6;
  const [pagItems, setPagItems] = useState([]);
  const [actualCardsVis, setActualCardsVis] = useState([]);
  const [actualIndex, setActualIndex] = useState(1);

  const [activeForm, setActiveForm] = useState(true);
  const [displayedProperties, setDisplayedProperties] =
    useState(propertiesList);

  useEffect(
    () =>
      setDisplayedProperties(
        activeForm ? propertiesList : propertiesListWithDistance
      ),
    [activeForm, propertiesList, propertiesListWithDistance]
  );

  /* function for vis properties by pagination number */
  const paginationFunct = (pageNumber) => {
    const propertiesListPagination = [];
    const start = (pageNumber - 1) * numForPagination;
    const end = pageNumber * numForPagination - 1;
    setActualIndex(pageNumber);

    for (let i = start; i <= end && i < displayedProperties.length; i++) {
      propertiesListPagination.push(displayedProperties[i]);
    }

    setActualCardsVis(propertiesListPagination);
    paginationItemsFunct();
  };

  /* inizialization actualCardsVis starting page */
  useEffect(() => {
    if (displayedProperties.length > 0) {
      paginationFunct(1);
    }
  }, [displayedProperties]);

  /* pagination items */
  const paginationItemsFunct = () => {
    let paginationItems = [];
    const totalPages = Math.ceil(displayedProperties.length / numForPagination);

    const startPage = Math.max(actualIndex - 1, 1);
    const endPage = Math.min(startPage + 2, totalPages);

    /* forward btn Pagination */
    paginationItems.push(
      <Pagination.Item
        key="prev"
        onClick={() => paginationFunct(actualIndex - 1)}
        disabled={actualIndex === 1}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </Pagination.Item>
    );

    /* print pagination items */
    for (let number = startPage; number <= endPage; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          id={number}
          active={number === actualIndex}
          onClick={() => paginationFunct(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    /* backward btn Pagination */
    paginationItems.push(
      <Pagination.Item
        key="next"
        onClick={() => paginationFunct(actualIndex + 1)}
        disabled={actualIndex === totalPages} // Disable when on the last page
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </Pagination.Item>
    );

    setPagItems(paginationItems);
  };

  useEffect(() => {
    if (displayedProperties.length > 0) {
      paginationItemsFunct();
    }
  }, [actualIndex]);

  return (
    <main className="d-flex" data-dark-mode={toggleDarkMode}>
      <div className="container d-flex flex-column py-4">
        <Row className="mb-4">
          <Col xs={8}>
            <h1>
              <i
                className="fa-solid fa-building icon-style me-3 "
                id="icon-search-title"
              ></i>{" "}
              Cerca l'immobile che desideri
            </h1>
          </Col>
          <Col xs={4} className="text-end">
            <input
              type="checkbox"
              className="btn-check"
              id="btncheck1"
              autoComplete="off"
              onClick={() => setActiveForm(!activeForm)}
            />
            <label className="btn btn-outline-primary" htmlFor="btncheck1">
              {activeForm
                ? "Cerca in base alla distanza"
                : "Cerca in base alle informazioni immobile"}
            </label>
          </Col>
        </Row>

        <SearchBar activeForm={activeForm} />

        {isLoading ? (
          <div className="d-flex spinner-container justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Risultati Trovati */}
            <div className="d-flex justify-content-center my-4">
              <h5
                className={
                  (toggleDarkMode ? "text-light" : "text-secondary") + " fs-6"
                }
              >
                Risultati trovati: {displayedProperties.length}{" "}
              </h5>
            </div>

            {/* card container */}
            <div className="flex-grow-1">
              <div className="row row-cols-1 row-cols-xl-2 g-4 homepage-card-container mb-4">
                {/* Cards */}
                {displayedProperties.length > 0 &&
                  displayedProperties.map((property) => {
                    return (
                      <AdvancedSearchCard
                        key={property.id}
                        element={property}
                      />
                    );
                  })}
              </div>
            </div>

            {displayedProperties.length > 0 ? (
              <div className="pagination-container">
                <Pagination className="justify-content-center mt-3">
                  {pagItems}
                </Pagination>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </main>
  );
}
