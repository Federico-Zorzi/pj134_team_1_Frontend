import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export default function GeneralPropertyCard(params) {
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
    <div
      className="col
    "
    >
      <div className="card search-card d-flex" key={property.id}>
        <Link to={`/${property.id}`} className="search-card-link">
          <div className="row g-0 search-card-grid">
            <div className="col-md-6">
              <img
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
                    {property.number_of_rooms}
                  </div>
                  {/* Numero bagni */}
                  <div className="card-text">
                    <i className="fa-solid fa-bath me-2"></i>
                    {property.number_of_bathrooms}
                  </div>
                  {/* Numero letti */}
                  <div className="card-text">
                    <i className="fa-solid fa-bed me-2"></i>
                    {property.number_of_beds}
                  </div>
                </div>
                {/* Indirizzo */}
                <div className="card-text mb-3">
                  <i className="fa-solid fa-location-dot me-2"></i>
                  {property.address}
                </div>
                {/* Metri quadrati */}
                <p className="card-text mq">
                  <i className="fa-solid fa-expand me-2"></i>
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
      </div>
    </div>
  );
}
