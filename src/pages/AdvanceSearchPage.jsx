import HomePage from "./HomePage";
import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import AdvancedSearchCard from "../components/AdvancedSearchCard";
import SearchBar from "../components/SearchBar";
import { Pagination } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

export default function AdvanceSearchPage() {
  // take data from global context
  const dataContext = useDataContext();
  const { propertiesList, fetchIndexProperties } = dataContext;
  useEffect(fetchIndexProperties, []);

  const numForPagination = 6;
  const [pagItems, setPagItems] = useState([]);
  const [actualCardsVis, setActualCardsVis] = useState([]);
  const [actualIndex, setActualIndex] = useState(1);

  /* function for vis properties by pagination number */
  const paginationFunct = (pageNumber) => {
    const propertiesListPagination = [];
    const start = (pageNumber - 1) * numForPagination;
    const end = pageNumber * numForPagination - 1;
    setActualIndex(pageNumber);

    for (let i = start; i <= end && i < propertiesList.length; i++) {
      propertiesListPagination.push(propertiesList[i]);
    }

    setActualCardsVis(propertiesListPagination);
    paginationItemsFunct();
  };

  /* inizialization actualCardsVis starting page */
  useEffect(() => {
    if (propertiesList.length > 0) {
      paginationFunct(1);
    }
  }, [propertiesList]);

  /* pagination items */
  const paginationItemsFunct = () => {
    let paginationItems = [];
    const totalPages = Math.ceil(propertiesList.length / numForPagination);

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
    if (propertiesList.length > 0) {
      paginationItemsFunct();
    }
  }, [actualIndex]);

  return (
    <>
      <div className="container min-vh-100">
        <SearchBar propertiesList={propertiesList} />
        <div className="my-4"></div>

        {/* Risultati Trovati */}
        <div className="d-flex justify-content-center mb-4">
          <h5 className="text-secondary fs-6">
            Risultati trovati: {propertiesList.length}{" "}
          </h5>
        </div>

        {/* card container */}
        <div className="row row-cols-1 row-cols-xl-2 g-4 homepage-card-container mb-4">
          {/* Cards */}
          {propertiesList.length > 0 &&
            actualCardsVis.map((property) => {
              return (
                <AdvancedSearchCard key={property.id} element={property} />
              );
            })}
        </div>

        <div>
          <Pagination className="justify-content-center mt-3">
            {pagItems}
          </Pagination>
        </div>
      </div>
    </>
  );
}
