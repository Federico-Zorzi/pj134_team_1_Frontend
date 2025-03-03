import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export default function HomepageCard(params) {
  const property = params.element;

  //  function debounce
  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  //   function to add like
  const [like, setLike] = useState(property.likes);

  const addLike = useCallback(
    debounce((id) => {
      const url = `http://localhost:3000/properties/${id}/addlike`;
      setLike((prev) => prev + 1);
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {});
    }, 300),
    []
  );

  function translatePropertyType(propertyType) {
    switch (propertyType) {
      case 1:
        return "Altro";
      case 2:
        return "Appartamento";
      case 3:
        return "Casa indipendente";
      case 4:
        return "Villa";
      case 5:
        return "Villetta a schiera";
      case 6:
        return "Chalet";
      case 7:
        return "Baita";
      default:
        return "Tipo sconosciuto";
    }
  }

  return (
    <div className="position-relative">
      <Link
        key={property.id}
        className="card homepage-card"
        to={`/${property.id}`}
      >
        <img
          src={`/img_properties/${property.image}`}
          className="card-img-top img-homepage"
        />
        <div className="card-body homepage-card-body">
          <h5 className="card-title fs-5">{property.title}</h5>
          <p className="card-text homepage-card-text">
            <i>{property.city}</i>
          </p>
          <Row className="align-items-end">
            <Col>
              <i className="fa-solid fa-location-dot icon-style me-2"></i>
              <span className="card-text">{property.address}</span>
            </Col>
            <Col className="text-end">
              <span className="badge text-dark border border-dark">
                {translatePropertyType(property.property_type)}
              </span>
            </Col>
          </Row>
        </div>
      </Link>
      <a
        className="likes-card-text text-danger"
        onClick={() => {
          addLike(property.id);
        }}
      >
        ❤ {like}
      </a>
    </div>
  );
}
