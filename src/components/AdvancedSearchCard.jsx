import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { useDataContext } from "../context/dataContext";

export default function AdvancedSearchCard(params) {
  const { isLoading, setIsLoading } = useDataContext();
  const property = params.element;
  const [reviewNumber, setReviewNumber] = useState(0);

  const fetchIndexReviews = () => {
    fetch(`http://localhost:3000/properties/${property.id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviewNumber(data.length);
      });
  };
  useEffect(fetchIndexReviews, []);

  const [like, setLike] = useState(property.likes);
  const addLike = (id) => {
    const url = `http://localhost:3000/properties/${id}/addlike`;
    setLike(like + 1);
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  function translatePropertyType(propertyType) {
    switch (propertyType) {
      case "apartment":
        return "Appartamento";
      case "independent_house":
        return "Casa indipendente";
      case "villa":
        return "Villa";
      case "terraced_villa":
        return "Villetta a schiera";
      case "chalet":
        return "Chalet";
      case "cabin":
        return "Baita";
      case "other":
        return "Altro";
      default:
        return "Tipo sconosciuto";
    }
  }

  return (
    <div
      className="col
    "
    >
      <div className="card search-card d-flex" key={property.id}>
        <Link to={`/${property.id}`} className="search-card-link">
          <div className="row g-0 search-card-grid">
            <div className="col-md-6">
              <img
                onClick={() => console.log(property)}
                src={`/img_properties/${property.image}`}
                className="img-fluid rounded-start h-100 w-100"
                alt="..."
              />
            </div>
            <div className="col-md-6 d-flex flex-grow-1">
              <div className="card-body card-body-search flex-grow-1">
                {/* Nome immobile */}
                <h5 className="card-title">{property.title}</h5>

                <p className="card-text">
                  <i>{property.city}</i>
                </p>
                <div className="d-flex gap-4 mb-3">
                  {/* Numero stanze */}
                  <div className="card-text">
                    <i className="fa-solid fa-door-open me-2"></i>
                    {property.n_Rooms}
                  </div>
                  {/* Numero bagni */}
                  <div className="card-text">
                    <i className="fa-solid fa-bath me-2"></i>
                    {property.n_Bathrooms}
                  </div>
                  {/* Numero letti */}
                  <div className="card-text">
                    <i className="fa-solid fa-bed me-2"></i>
                    {property.n_Beds}
                  </div>
                </div>
                {/* Indirizzo */}
                <div className="card-text mb-3">
                  <i className="fa-solid fa-location-dot me-2"></i>
                  {property.address}
                </div>
                {/* Metri quadrati */}
                <p className="card-text mq">
                  <strong>Metri quadrati : </strong>
                  {property.square_meters}
                </p>
                <Row className="align-items-end">
                  <Col>
                    <span className="card-text col-6 fw-bold">
                      {reviewNumber ? reviewNumber : "0"} recensioni
                    </span>
                  </Col>
                  <Col className="text-end">
                    <span className="badge text-dark border border-dark">
                      {translatePropertyType(property.property_type)}
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Link>
        <Link
          className="likes-card-text-search text-danger"
          onClick={() => {
            addLike(property.id);
          }}
        >
          ❤ {like}
        </Link>
      </div>
    </div>
  );
}
